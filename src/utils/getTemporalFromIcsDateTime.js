import {Temporal} from '@js-temporal/polyfill';

export default function getTemporalFromIcsDateTime(date) {
  return Temporal.Instant.fromEpochMilliseconds(date.getTime())
}
