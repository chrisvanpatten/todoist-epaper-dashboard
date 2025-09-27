export default function sortEvents(events) {
  const sortedByDate = events.toSorted((a, b) => {
    const aDate = new Date(a.start);
    const bDate = new Date(b.start);

    return aDate.getTime() - bDate.getTime();
  });

  return sortedByDate;
}
