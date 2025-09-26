import {Temporal} from '@js-temporal/polyfill';

export default function getTemporalFromDateTimeZone(date, timezone) {
  const instant = Temporal.Instant.fromEpochMilliseconds(date.getTime())

  return instant;//.toZonedDateTimeISO(timezone);
}
