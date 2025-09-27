import {css} from '@emotion/css';

export default function Block(props) {
  const {
    children,
  } = props;

  const styles = {
    block: css`
      padding: 0.4em 0.5em;
      margin: 0;
    `,
  };

  return (
    <section className={styles.block}>
      {children}
    </section>
  );
}
