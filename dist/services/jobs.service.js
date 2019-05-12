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
const context_1 = require("@loopback/context");
const apollo_server_express_1 = require("apollo-server-express");
const async_1 = require("async");
const query = apollo_server_express_1.gql `
    query job($jobId: String!) {
        job(jobId: $jobId) {
            id
            isRunning
            passed
        }
    }
`;
class JobsService {
    async getJobStatus(job) {
        const res = await this.client.query({ query, variables: { jobId: job.id } });
        return res.data.job;
    }
    async waitForJobToFinish(job) {
        return new Promise((resolve, reject) => {
            async_1.doUntil((next) => {
                this.getJobStatus(job)
                    .then((res) => this.wait(res))
                    .then((res) => next(null, res))
                    .catch(err => next(err));
            }, (res) => {
                return !res.isRunning;
            }, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }
    async wait(res) {
        return new Promise(resolve => setTimeout(() => resolve(res), 5000));
    }
}
__decorate([
    context_1.inject('graphql.client'),
    __metadata("design:type", Object)
], JobsService.prototype, "client", void 0);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map