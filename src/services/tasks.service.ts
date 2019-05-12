import { inject } from '@loopback/context';
import { gql } from 'apollo-server-express';

// GraphQL query for getting task information
const createCiJobMutation = gql`
    mutation createCiJob {
        createCiJob {
            id
            isRunning
        }
    }
`;

/**
 * Service for getting task information from ws-flare-graphql
 */
export class TasksService {

    @inject('graphql.client')
    private client: any;

    /**
     * Runs a new task on the ws-flare platform
     */
    async startTask() {
        const res = await this.client.mutate({mutation: createCiJobMutation});

        return res.data.createCiJob;
    }
}
