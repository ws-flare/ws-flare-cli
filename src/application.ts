import "isomorphic-fetch";
import { Application, ApplicationConfig } from '@loopback/core';
import { createLogger, transports } from 'winston';
import { Cli } from './cli';
import * as yargs from 'yargs';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ArgsService } from './services/args.service';
import { TasksService } from './services/tasks.service';
import { JobsService } from './services/jobs.service';

export class WsFlareCliApplication extends Application {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        const logger = createLogger({
            transports: [
                new transports.Console(),
            ],
        });

        const authLink = setContext((_, {headers}) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${yargs.argv.token}`,
                }
            }
        });

        const client = new ApolloClient({
            link: authLink.concat(createHttpLink({uri: `${yargs.argv.server}/graphql`})),
            cache: new InMemoryCache(),
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all'
                }
            }
        });

        this.server(Cli);

        // Logger
        this.bind('logger').to(logger);

        // Arguments
        this.bind('args.server').to(yargs.argv.server);
        this.bind('args.token').to(yargs.argv.token);

        // Services
        this.bind('services.args').toClass(ArgsService);
        this.bind('services.tasks').toClass(TasksService);
        this.bind('services.jobs').toClass(JobsService);

        // Graphql
        this.bind('graphql.client').to(client);
    }
}
