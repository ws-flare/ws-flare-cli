import { ArgsService } from '../../services/args.service';
import { getLogger } from './test-helper';
import { Logger } from 'winston';
import { assert, stub } from 'sinon';
import { expect } from '@loopback/testlab';

describe('Args Service', () => {

    let service: ArgsService;
    let logger: Logger;
    let server: string;
    let token: string;
    let exitStub: any;

    beforeEach(() => {
        logger = getLogger();
        server = 'http://test.com';
        token = 'abc123';

        exitStub = stub(process, 'exit');

        service = new ArgsService(logger, server, token);
    });

    afterEach(() => {
        exitStub.restore();
    });

    it('should exit process if no server url is provided', () => {
        service = new ArgsService(logger, null as any, token);

        service.verify();

        assert.calledWith(exitStub, 1);
    });

    it('should exit process if no token is provided', () => {
        service = new ArgsService(logger, server, null as any);

        service.verify();

        assert.calledWith(exitStub, 1);
    });

    it('should return true if server and token are provided', () => {
        service = new ArgsService(logger, server, token);

        expect(service.verify()).to.eql(true);
    });
});
