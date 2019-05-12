import { WsFlareCliApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { WsFlareCliApplication };

/**
 * Entry point for the process
 * @param options
 */
export async function main(options: ApplicationConfig = {}) {
    const app = new WsFlareCliApplication(options);
    await app.start();
    return app;
}
