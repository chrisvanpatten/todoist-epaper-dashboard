import {css, cx} from '@emotion/css';

export default function Event(props) {
  const {
    summary = '',
    allDay = false,
  } = props;

  const styles = {
    event: css`
      padding: 0.3em 0.4em;
    `,
    allDay: css`
      background: black;
      color: white;
      border-radius: 4px;
    `,
  };

  return (
    <li className={cx(styles.event, {[styles.allDay]: allDay})}>{summary}</li>
  );
}
