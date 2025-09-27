import axios from 'axios';
import {convertIcsCalendar} from 'ts-ics';
import getCleanEvent from '@/utils/getCleanEvent';
import getSerializableEvent from '@/utils/getSerializableEvent';
import isEventInRange from '@/utils/isEventInRange';
import sortEvents from '@/utils/sortEvents';
import {Temporal} from '@js-temporal/polyfill';

export default async function getEvents() {
  const response = await axios(process.env.CALENDAR_1);

  const calendar = convertIcsCalendar(undefined, response.data);

  const filteredEvents = calendar.events
    .filter(
      (event) =>
        isEventInRange(
          event,
          Temporal.Now.instant(),
          Temporal.Now.instant().add({seconds: 86400*30}),
        )
    );

  return filteredEvents
    .map(getCleanEvent)
    .toSorted(sortEvents)
    .map(getSerializableEvent);
}
