import {Temporal} from '@js-temporal/polyfill';
import getTemporalFromIcsDate from '@/utils/getTemporalFromIcsDate';

export default function isEventInRange(event, start, end) {
  const eventDate = event?.end?.date;

  if (!eventDate) {
    return false;
  }

  /**
   * All-day (DATE-only) events are quirkily parsed by ts-ics as UTC
   * timestamps that actually encode the local (America/New_York) calendar
   * date - see the identical workaround in getCleanEvent/getTemporalFromIcsDate.
   * Treating them as real UTC instants here made all-day events appear to
   * have already ended as soon as local time passed UTC midnight (8pm EDT /
   * 7pm EST), causing them to drop off the dashboard hours early.
   */
  const eventDateTemporal = event.end.type === 'DATE'
    ? getTemporalFromIcsDate(eventDate, 'America/New_York').toInstant()
    : Temporal.Instant.fromEpochMilliseconds(eventDate.getTime());

  const isAfterStart = Temporal.Instant.compare(eventDateTemporal, start) === 1;
  const isBeforeEnd = Temporal.Instant.compare(eventDateTemporal, end) === -1;

  return isAfterStart && isBeforeEnd;
}
