import getTodoistApi from '@/api/todoist/getTodoistApi';

export default async function getTasksByFilter(query) {
  const api = getTodoistApi();

  const rawTasks = await api.getTasksByFilter({query});

  return rawTasks?.results ?? [];
}
