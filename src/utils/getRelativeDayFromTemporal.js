import {Temporal} from '@js-temporal/polyfill';

export default function getRelativeDayFromTemporal(temporal) {
  const dayDiff = temporal.since(Temporal.Now.plainDateISO()).days;

  return ['Yesterday', 'Today', 'Tomorrow'][dayDiff + 1] ?? null;
}
