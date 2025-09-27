import getTemporalFromIcsDate from '@/utils/getTemporalFromIcsDate';
import getTemporalFromIcsDateTime from '@/utils/getTemporalFromIcsDateTime';

export default function getCleanEvent(event) {
  const {
    start,
    end,
    summary,
    location = null,
  } = event;

  const allDay = start.type === 'DATE' && end.type === 'DATE';

  const getTemporal = (date) => {
    return allDay
      ? getTemporalFromIcsDate(date, 'America/New_York')
      : getTemporalFromIcsDateTime(date);
  };

  const startTemporal = getTemporal(start.date);
  const endTemporal = getTemporal(end.date);

  return {
    start: startTemporal.toLocaleString(),
    end: endTemporal.toLocaleString(),
    allDay,
    summary: summary?.trim() ?? null,
    location,
  }
}
