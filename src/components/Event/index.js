import {css, cx} from '@emotion/css';

export default function Event(props) {
  const {
    summary = '',
    allDay = false,
    start,
    end,
  } = props;

  const styles = {
    event: css`
      padding: 0.3em 0.4em;
      display: flex;
    `,
    allDay: css`
      background: black;
      color: white;
      border-radius: 4px;
    `,
    summary: css`
      flex: 1;
      margin: 0 0.4em 0 0;
    `,
    time: css`
      font-size: 13px;
      font-weight: 400;
      margin: 0.15em 0 0 0;
    `,
  };

  return (
    <li className={cx(styles.event, {[styles.allDay]: allDay})}>
      <p className={styles.summary}>{summary}</p>
      {!allDay && <p className={styles.time}>{start}</p>}
    </li>
  );
}
