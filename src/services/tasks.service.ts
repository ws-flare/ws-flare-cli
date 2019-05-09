import { inject } from '@loopback/context';
import { gql } from 'apollo-server-express';

const createCiJobMutation = gql`
    mutation createCiJob {
        createCiJob {
            id
            isRunning
        }
    }
`;

export class TasksService {

    @inject('graphql.client')
    private client: any;

    async startTask() {
        const res = await this.client.mutate({mutation: createCiJobMutation});

        return res.data.createCiJob;
    }
}
