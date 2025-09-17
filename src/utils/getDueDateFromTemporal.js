import getRelativeDayFromTemporal from '@/utils/getRelativeDayFromTemporal';

export default function getDueDateFromTemporal(temporal) {
  const relative = getRelativeDayFromTemporal(temporal);

  if (relative) {
    return relative;
  }

  return temporal.toLocaleString('en-US', {day: 'numeric', month: 'short'});
}
