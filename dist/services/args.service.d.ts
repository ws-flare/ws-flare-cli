import { Logger } from 'winston';
export declare class ArgsService {
    private logger;
    private server;
    private token;
    constructor(logger: Logger, server: string, token: string);
    verify(): true | void;
    private isValidServer;
    private isValidToken;
    private exit;
}
