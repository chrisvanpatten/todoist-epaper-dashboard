export default function sortTaskGroup(tasks) {
  const sortedByDate = tasks.toSorted((a, b) => {
    const aDate = new Date(a.due.date);
    const bDate = new Date(b.due.date);

    return aDate.getTime() - bDate.getTime();
  });

  const sortedByPriority = sortedByDate.toSorted((a, b) => {
    return b.priority - a.priority;
  });

  return sortedByPriority;
}
