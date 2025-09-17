import getTodoistApi from '@/api/todoist/getTodoistApi';

export default async function getTasksByFilter(query) {
  const api = getTodoistApi();

  const rawProjects = await api.getProjects();
  const projects = rawProjects?.results ?? [];

  return projects.reduce((acc = {}, item) => {
    return {
      ...acc,
      [item.id]: item.name,
    };
  }, {});
}
