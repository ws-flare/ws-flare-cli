"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
const core_1 = require("@loopback/core");
const winston_1 = require("winston");
const cli_1 = require("./cli");
const yargs = require("yargs");
const apollo_client_1 = require("apollo-client");
const apollo_link_http_1 = require("apollo-link-http");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_link_context_1 = require("apollo-link-context");
const args_service_1 = require("./services/args.service");
const tasks_service_1 = require("./services/tasks.service");
const jobs_service_1 = require("./services/jobs.service");
class WsFlareCliApplication extends core_1.Application {
    constructor(options = {}) {
        super(options);
        const logger = winston_1.createLogger({
            transports: [
                new winston_1.transports.Console(),
            ],
        });
        const authLink = apollo_link_context_1.setContext((_, { headers }) => {
            return {
                headers: Object.assign({}, headers, { authorization: `Bearer ${yargs.argv.token}` })
            };
        });
        const client = new apollo_client_1.ApolloClient({
            link: authLink.concat(apollo_link_http_1.createHttpLink({ uri: `${yargs.argv.server}/graphql` })),
            cache: new apollo_cache_inmemory_1.InMemoryCache(),
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all'
                }
            }
        });
        this.server(cli_1.Cli);
        // Logger
        this.bind('logger').to(logger);
        // Arguments
        this.bind('args.server').to(yargs.argv.server);
        this.bind('args.token').to(yargs.argv.token);
        // Services
        this.bind('services.args').toClass(args_service_1.ArgsService);
        this.bind('services.tasks').toClass(tasks_service_1.TasksService);
        this.bind('services.jobs').toClass(jobs_service_1.JobsService);
        // Graphql
        this.bind('graphql.client').to(client);
    }
}
exports.WsFlareCliApplication = WsFlareCliApplication;
//# sourceMappingURL=application.js.map