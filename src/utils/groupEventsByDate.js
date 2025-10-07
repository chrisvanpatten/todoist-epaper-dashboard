import getSerializableEvent from '@/utils/getSerializableEvent';
import {Temporal} from '@js-temporal/polyfill';

function getDateRangeFromAllDayEvent(start, end) {
  /**
   * Count the total number of days in the duration from start to end, and round
   * to a whole number.
   */
  const length = Math.round(start.until(end).total('days'));

  return Array.from(
    {length: length},
    (_, i) => start.add({days: i})
  );
}

export default function groupEventsByDate(groupedEvents, event) {
  const {
    allDay,
    start,
    end,
  } = event;

  // Build the date keys.
  const dates = allDay
    ? getDateRangeFromAllDayEvent(start, end)
    : [start];

  for (const date of dates) {
    // Handles multi-day events which started yesterday or earlier.
    if (Temporal.Now.instant().since(date).total('hours') > 28) {
      continue;
    }

    const formattedDate = date.toLocaleString(
      'en-GB',
      {
        month: 'short',
        day: 'numeric',
      },
    );

    (groupedEvents[formattedDate] ??= []).push(getSerializableEvent(event));
  }

  return groupedEvents;
}
