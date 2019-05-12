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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const args_service_1 = require("./services/args.service");
const tasks_service_1 = require("./services/tasks.service");
const jobs_service_1 = require("./services/jobs.service");
class Cli extends core_1.Context {
    get listening() {
        return true;
    }
    async start() {
        this.logger.info('Process started');
        this.argsService.verify();
        try {
            const job = await this.tasksService.startTask();
            this.logger.info('Job has started');
            this.logger.info('Waiting for job to complete');
            await this.jobsService.waitForJobToFinish(job);
            const result = await this.jobsService.getJobStatus(job);
            if (result.passed) {
                this.logger.info('Job has passed');
                process.exit(0);
            }
            else {
                this.logger.error('Job failed');
                process.exit(1);
            }
        }
        catch (err) {
            this.logger.error('Job failed');
            process.exit(1);
        }
    }
}
__decorate([
    core_1.inject('logger'),
    __metadata("design:type", Object)
], Cli.prototype, "logger", void 0);
__decorate([
    core_1.inject('args.server'),
    __metadata("design:type", String)
], Cli.prototype, "server", void 0);
__decorate([
    core_1.inject('services.args'),
    __metadata("design:type", args_service_1.ArgsService)
], Cli.prototype, "argsService", void 0);
__decorate([
    core_1.inject('services.tasks'),
    __metadata("design:type", tasks_service_1.TasksService)
], Cli.prototype, "tasksService", void 0);
__decorate([
    core_1.inject('services.jobs'),
    __metadata("design:type", jobs_service_1.JobsService)
], Cli.prototype, "jobsService", void 0);
exports.Cli = Cli;
//# sourceMappingURL=cli.js.map