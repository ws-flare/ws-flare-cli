"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const args_service_1 = require("../../services/args.service");
const test_helper_1 = require("./test-helper");
const sinon_1 = require("sinon");
const testlab_1 = require("@loopback/testlab");
describe('Args Service', () => {
    let service;
    let logger;
    let server;
    let token;
    let exitStub;
    beforeEach(() => {
        logger = test_helper_1.getLogger();
        server = 'http://test.com';
        token = 'abc123';
        exitStub = sinon_1.stub(process, 'exit');
        service = new args_service_1.ArgsService(logger, server, token);
    });
    afterEach(() => {
        exitStub.restore();
    });
    it('should exit process if no server url is provided', () => {
        service = new args_service_1.ArgsService(logger, null, token);
        service.verify();
        sinon_1.assert.calledWith(exitStub, 1);
    });
    it('should exit process if no token is provided', () => {
        service = new args_service_1.ArgsService(logger, server, null);
        service.verify();
        sinon_1.assert.calledWith(exitStub, 1);
    });
    it('should return true if server and token are provided', () => {
        service = new args_service_1.ArgsService(logger, server, token);
        testlab_1.expect(service.verify()).to.eql(true);
    });
});
//# sourceMappingURL=args.service.spec.js.map