export default function sortTasksByDate(a, b) {
  if (!a?.due?.date || !b?.due?.date) {
    return 1;
  }

  const aDate = new Date(a.due.date);
  const bDate = new Date(b.due.date);

  return aDate.getTime() - bDate.getTime();
}
