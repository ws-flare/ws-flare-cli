import { Context, inject, Server } from '@loopback/core';
import { Logger } from 'winston';
import { ArgsService } from './services/args.service';
import { TasksService } from './services/tasks.service';
import { Job } from './models/job.model';
import { JobsService } from './services/jobs.service';

/**
 * Runs the ws-flare-cli job
 */
export class Cli extends Context implements Server {

    @inject('logger')
    private logger: Logger;

    @inject('args.server')
    private server: string;

    @inject('services.args')
    private argsService: ArgsService;

    @inject('services.tasks')
    private tasksService: TasksService;

    @inject('services.jobs')
    private jobsService: JobsService;

    get listening() {
        return true;
    }

    /**
     * Runs a task on the ws-flare-cli platform to test a websocket server
     */
    async start() {
        this.logger.info('Process started');

        this.argsService.verify();

        try {
            const job: Job = await this.tasksService.startTask();

            this.logger.info('Job has started');

            this.logger.info('Waiting for job to complete');

            await this.jobsService.waitForJobToFinish(job);

            const result = await this.jobsService.getJobStatus(job);

            if (result.passed) {
                this.logger.info('Job has passed');
                process.exit(0);
            } else {
                this.logger.error('Job failed');
                process.exit(1);
            }
        } catch (err) {
            this.logger.error('Job failed');
            process.exit(1);
        }
    }
}
