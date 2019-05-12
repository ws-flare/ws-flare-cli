"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
function getLogger() {
    return winston_1.createLogger({
        transports: [
            new winston_1.transports.Console(),
        ],
    });
}
exports.getLogger = getLogger;
//# sourceMappingURL=test-helper.js.map