import getTemporalFromDateTimeZone from '@/utils/getTemporalFromDateTimeZone';

export default function getCleanEvent(event) {
  const {
    start,
    end,
    summary,
    location = null,
  } = event;

  const allDay = start.type === 'DATE' && end.type === 'DATE';

//  console.log(start);

  const startTemporal = getTemporalFromDateTimeZone(start.date, start?.local?.tzoffset ?? 'America/New_York', allDay);
  const endTemporal = getTemporalFromDateTimeZone(end.date, end?.local?.tzoffset ?? 'America/New_York', allDay);

  return {
    start: startTemporal.toLocaleString(),
    end: endTemporal.toLocaleString(),
    allDay,
    summary: summary?.trim() ?? null,
    location,
  }
}
