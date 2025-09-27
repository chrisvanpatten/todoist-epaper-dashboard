import {Temporal} from '@js-temporal/polyfill';

export default function getTemporalFromIcsDate(date, timezone) {
  /**
   * For some reason, ICS all day events are being parsed as UTC timestamps
   * but in the local (typically New York) date and time. I am assuming this
   * is a quirk of the ts-ics library, and work around it here by generating
   * a new Temporal ZonedDateTime using all the "UTC" values _except_ the
   * time zone. This yields the correct result: an all-day event starting at
   * 12:00AM local time on the expected date.
   */
  const from = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds(),
    timeZone: timezone,
  };

  return Temporal.ZonedDateTime.from(from);
}
