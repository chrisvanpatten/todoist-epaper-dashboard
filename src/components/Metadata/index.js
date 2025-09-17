import {css} from '@emotion/css';

export default function Metadata(props) {
  const {
    children,
  } = props;

  const styles = {
    metadata: css`
      display: flex;
      justify-content: space-between;
      margin: 0.4em 0 0;
      font-size: 13px;
      font-weight: 400;

      &:has(> div:only-child) {
        justify-content: flex-end;
      }
    `,
  };

  return (
    <div className={styles.metadata}>
      {children}
    </div>
  );
}
