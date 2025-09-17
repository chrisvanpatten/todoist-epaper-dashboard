import getTodoistApi from '@/api/todoist/getTodoistApi';
import sortTaskGroup from '@/utils/sortTaskGroup';

export default async function getTasksByFilter(query) {
  const api = getTodoistApi();

  const rawTasks = await api.getTasksByFilter({query});

  return sortTaskGroup(rawTasks?.results ?? []);
}
