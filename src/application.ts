import { Application, ApplicationConfig } from '@loopback/core';
import { createLogger, transports } from 'winston';
import { Cli } from './cli';
import * as yargs from 'yargs';
import { ArgsService } from './services/args.service';

export class WsFlareCliApplication extends Application {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        const logger = createLogger({
            transports: [
                new transports.Console(),
            ],
        });

        this.server(Cli);

        // Logger
        this.bind('logger').to(logger);

        // Arguments
        this.bind('args.server').to(yargs.argv.server);
        this.bind('args.token').to(yargs.argv.token);

        // Services
        this.bind('services.args').toClass(ArgsService);
    }
}
