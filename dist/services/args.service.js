"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
let ArgsService = class ArgsService {
    constructor(logger, server, token) {
        this.logger = logger;
        this.server = server;
        this.token = token;
    }
    verify() {
        this.logger.info('Verifying arguments');
        return (this.isValidServer() && this.isValidToken()) || this.exit();
    }
    isValidServer() {
        return !!this.server;
    }
    isValidToken() {
        return !!this.token;
    }
    exit() {
        this.logger.error('Invalid arguments provided');
        process.exit(1);
    }
};
ArgsService = __decorate([
    __param(0, context_1.inject('logger')),
    __param(1, context_1.inject('args.server')),
    __param(2, context_1.inject('args.token')),
    __metadata("design:paramtypes", [Object, String, String])
], ArgsService);
exports.ArgsService = ArgsService;
//# sourceMappingURL=args.service.js.map