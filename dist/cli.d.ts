import { Context, Server } from '@loopback/core';
export declare class Cli extends Context implements Server {
    private logger;
    private server;
    private argsService;
    private tasksService;
    private jobsService;
    readonly listening: boolean;
    start(): Promise<void>;
}
