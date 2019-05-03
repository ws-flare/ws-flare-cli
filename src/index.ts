import { WsFlareCliApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { WsFlareCliApplication };

export async function main(options: ApplicationConfig = {}) {
    const app = new WsFlareCliApplication(options);
    await app.start();
    return app;
}
