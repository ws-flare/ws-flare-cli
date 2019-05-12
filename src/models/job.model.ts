/**
 * Interface which describes features of a job
 */
export interface Job {
    id: string;
    createdAt: string;
    userId: string;
    taskId: string;
    isRunning: boolean;
    passed: boolean;
    totalSimulators: number;
}
