export default function sortEvents(a, b) {
  const aDate = new Date(a.start.toLocaleString());
  const bDate = new Date(b.start.toLocaleString());

  return aDate.getTime() - bDate.getTime();
}
