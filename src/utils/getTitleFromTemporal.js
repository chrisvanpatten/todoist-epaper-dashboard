import getRelativeDayFromTemporal from '@/utils/getRelativeDayFromTemporal';

export default function getTitleFromTemporal(temporal) {
  const segments = [];

  segments.push(temporal.toLocaleString('en-US', {day: 'numeric', month: 'short'}));
  segments.push(getRelativeDayFromTemporal(temporal));
  segments.push(temporal.toLocaleString('en-US', {weekday: 'long'}));
 
  return segments.filter(i => i).join(' ‧ ');
}
