import getDueDateFromTemporal from '@/utils/getDueDateFromTemporal';
import {Temporal} from '@js-temporal/polyfill';

export default function DueDate(props) {
  const {
    dueDate,
  } = props;

  const formattedDueDate = getDueDateFromTemporal(Temporal.PlainDate.from(dueDate));

  return (
    <div>
      {formattedDueDate}
    </div>
  );
}
