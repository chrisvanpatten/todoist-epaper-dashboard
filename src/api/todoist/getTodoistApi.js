import {TodoistApi} from '@doist/todoist-api-typescript';

export default function Todoist() {
  return new TodoistApi(process.env.TODOIST_API_KEY);
}
