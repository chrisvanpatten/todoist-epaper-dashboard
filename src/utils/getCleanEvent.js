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
    start: startTemporal,
    // Small hack to ensure the allDay events end at 11:59, rather than 12:00
    //end: allDay ? endTemporal.subtract({seconds: 1}) : endTemporal,
    end: endTemporal,
    allDay,
    summary: summary?.trim() ?? null,
    location,
  }
}
