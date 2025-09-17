import {TodoistApi} from '@doist/todoist-api-typescript';

export default () => new TodoistApi(process.env.TODOIST_API_KEY);
