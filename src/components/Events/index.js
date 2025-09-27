import {css} from '@emotion/css';

export default function Events(props) {
  const {
    children,
  } = props;

  const styles = {
    events: css`
      margin: 0;
      padding: 0;
      list-style: none;
    `,
  };

  return (
    <ul className={styles.events}>{children}</ul>
  );
}
