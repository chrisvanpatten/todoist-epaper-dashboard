import {css} from '@emotion/css';
import Event from '@/components/Event';

export default function Events(props) {
  const {
    events = [],
  } = props;

  const styles = {
    eventsBlock: css`
      margin: 0 0 1em;

      &:last-child {
        margin: 0;
      }
    `,
    eventsList: css`
      margin: 0;
      padding: 0;
      list-style: none;
    `,
    date: css`
      font-size: 16px;
      margin: 0;
      padding: 0 0.4em 0.3em 0.4em;
    `,
  };

  const dates = Object.keys(events);

  return (
    <section>
      {dates.map((date) => (
        <div className={styles.eventsBlock} key={date}>
            <h2 className={styles.date}>{date}</h2>
            <ul className={styles.eventsList}>
              {events[date].map((event) => (
                <Event {...event} key={event.summary} />
              ))}
            </ul>
        </div>
      ))}
    </section>
  );
}
