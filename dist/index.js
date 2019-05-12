"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.WsFlareCliApplication = application_1.WsFlareCliApplication;
async function main(options = {}) {
    const app = new application_1.WsFlareCliApplication(options);
    await app.start();
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map