export default function getSerializableEvent(event) {
  return {
     ...event,
    start: event.start.toLocaleString(),
    end: event.end.toLocaleString(),
  };
}
