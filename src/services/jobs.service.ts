import { inject } from '@loopback/context';
import { gql } from 'apollo-server-express';
import { Job } from '../models/job.model';
import { doUntil } from 'async';

const query = gql`
    query job($jobId: String!) {
        job(jobId: $jobId) {
            id
            isRunning
            passed
        }
    }
`;

export class JobsService {

    @inject('graphql.client')
    private client: any;

    async getJobStatus(job: Job): Promise<Job> {
        const res = await this.client.query({query, variables: {jobId: job.id}});

        return res.data.job;
    }

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

    async wait(res: Job): Promise<Job> {
        return new Promise(resolve => setTimeout(() => resolve(res), 5000));
    }
}
