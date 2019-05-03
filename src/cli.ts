import { Context, inject, Server } from '@loopback/core';
import { Logger } from 'winston';
import { ArgsService } from './services/args.service';

export class Cli extends Context implements Server {

    @inject('logger')
    private logger: Logger;

    @inject('args.server')
    private server: string;

    @inject('services.args')
    private argsService: ArgsService;

    get listening() {
        return true;
    }

    async start() {
        this.logger.info('Process started');

        this.argsService.verify();
    }
}
