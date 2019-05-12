import { inject } from '@loopback/context';
import { gql } from 'apollo-server-express';
import { Job } from '../models/job.model';
import { doUntil } from 'async';

// GraphQL query for getting job information
const query = gql`
    query job($jobId: String!) {
        job(jobId: $jobId) {
            id
            isRunning
            passed
        }
    }
`;

/**
 * Service for creating and getting job information from ws-flare-graphql
 */
export class JobsService {

    @inject('graphql.client')
    private client: any;

    /**
     * Gets the status of a running job
     * @param job - The job to search for
     */
    async getJobStatus(job: Job): Promise<Job> {
        const res = await this.client.query({query, variables: {jobId: job.id}});

        return res.data.job;
    }

    /**
     * Checks the status of the job every 5 seconds.
     * If the job has completed and passed then resolve the promise,
     * If the job has completed and failed then reject the promise
     * If the job is still in progress then wait for 5 seconds and check again
     * @param job
     */
    async waitForJobToFinish(job: Job): Promise<boolean> {
        return new Promise((resolve, reject) => {
            doUntil((next) => {
                this.getJobStatus(job)
                    .then((res) => this.wait(res))
                    .then((res) => next(null, res))
                    .catch(err => next(err));
            }, (res: Job) => {
                return !res.isRunning;
            }, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }

    /**
     * Wait for 5 seconds
     *
     * @param res - The running job
     */
    async wait(res: Job): Promise<Job> {
        return new Promise(resolve => setTimeout(() => resolve(res), 5000));
    }
}
