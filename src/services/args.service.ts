import { inject } from '@loopback/context';
import { Logger } from 'winston';

/**
 * Service for parsing and validating parameter arguments
 */
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

    /**
     * Checks if all parameters pass verification
     */
    verify() {
        this.logger.info('Verifying arguments');

        return (this.isValidServer() && this.isValidToken()) || this.exit();
    }

    /**
     * Checks if the "server" flag is available
     */
    private isValidServer() {
        return !!this.server;
    }

    /**
     * Checks if the "token" flag has is available
     */
    private isValidToken() {
        return !!this.token;
    }

    /**
     * Exit the process with status 1 if there are invalid arguments
     */
    private exit() {
        this.logger.error('Invalid arguments provided');
        process.exit(1);
    }
}
