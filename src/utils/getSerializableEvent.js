export default function getSerializableEvent(event) {
  return {
    ...event,
    start: event.start.toLocaleString('en-US', {timeStyle: 'short'}),
    end: event.end.toLocaleString('en-US', {timeStyle: 'short'}),
  };
}
