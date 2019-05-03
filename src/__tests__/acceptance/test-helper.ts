import { createLogger, transports } from 'winston';

export function getLogger() {
    return createLogger({
        transports: [
            new transports.Console(),
        ],
    });
}
