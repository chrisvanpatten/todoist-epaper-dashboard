import getTemporalFromDateTimeZone from '@/utils/getTemporalFromDateTimeZone';

export default function getCleanEvent(event) {
  const {
    start,
    end,
    summary,
    location,
  } = event;

  return {
    start: getTemporalFromDateTimeZone(start.date, start?.local?.tzoffset ?? 'America/New_York').toLocaleString(),
    end: getTemporalFromDateTimeZone(end.date, end?.local?.tzoffset ?? 'America/New_York').toLocaleString(),
    summary,
    location: location ?? null,
  }
}
