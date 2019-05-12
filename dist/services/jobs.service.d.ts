import { Job } from '../models/job.model';
export declare class JobsService {
    private client;
    getJobStatus(job: Job): Promise<Job>;
    waitForJobToFinish(job: Job): Promise<boolean>;
    wait(res: Job): Promise<Job>;
}
