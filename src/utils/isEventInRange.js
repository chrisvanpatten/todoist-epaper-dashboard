import {Temporal} from '@js-temporal/polyfill';

export default function isEventInRange(event, start, end) {
  const eventDate = event?.end?.date;

  if (!eventDate) {
    return false;
  }

  const eventDateTemporal = Temporal.Instant.fromEpochMilliseconds(eventDate.getTime())

  const isAfterStart = Temporal.Instant.compare(eventDateTemporal, start) === 1;
  const isBeforeEnd = Temporal.Instant.compare(eventDateTemporal, end) === -1;

  return isAfterStart && isBeforeEnd;
}
