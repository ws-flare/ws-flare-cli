import { inject } from '@loopback/context';
import { Logger } from 'winston';

export class ArgsService {

    constructor(
        @inject('logger')
        private logger: Logger,
        @inject('args.server')
        private server: string,
        @inject('args.token')
        private token: string
    ) {
    }

    verify() {
        this.logger.info('Verifying arguments');

        return (this.isValidServer() && this.isValidToken()) || this.exit();
    }

    private isValidServer() {
        return !!this.server;
    }

    private isValidToken() {
        return !!this.token;
    }

    private exit() {
        this.logger.error('Invalid arguments provided');
        process.exit(1);
    }
}
