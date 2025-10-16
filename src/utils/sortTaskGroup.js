export default function sortTaskGroup(tasks) {
  return tasks
    .toSorted(sortTasksByChildOrder)
    .toSorted(sortTasksByDate)
    .toSorted(sortTasksByPriority);
}
