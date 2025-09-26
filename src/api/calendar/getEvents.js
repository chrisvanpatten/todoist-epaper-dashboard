import axios from 'axios';
import {convertIcsCalendar} from 'ts-ics';
import getCleanEvent from '@/utils/getCleanEvent';
import isEventInRange from '@/utils/isEventInRange';

export default async function getEvents() {
  const response = await axios(process.env.CALENDAR_1);

  const calendar = convertIcsCalendar(undefined, response.data);

  console.log(calendar.events.map(getCleanEvent));

  return calendar.events.map(getCleanEvent).filter((event) => isEventInRange(event, 'now', 'now +30'));
  //calendar.events.map(getCleanEvent);
}
