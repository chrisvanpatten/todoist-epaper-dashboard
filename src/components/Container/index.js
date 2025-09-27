import {css, cx} from '@emotion/css';

export default function Container(props) {
  const {
    children,
    orientation = 'horizontal',
    rotate = false,
    columns = false,
  } = props;

  const styles = {
    container: css`
      padding: 0.4em 0.5em;
      margin: 0;
      overflow: hidden;

      .twemoji {
        width: auto;
        height: 1em;
        display: inline-block;
        position: relative;
        top: 2px;
      }
    `,
    horizontal: css`
      width: 800px;
      height: 480px;
    `,
    vertical: css`
      width: 480px;
      height: 800px;
    `,
    rotate: css`
      transform: rotate(90deg) translate(-160px, -160px);
    `,
    columns: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1em;
    `,
  };

  return (
    <div
      className={
        cx(
          styles.container,
          {[styles.horizontal]: orientation === 'horizontal'},
          {[styles.vertical]: orientation === 'vertical'},
          {[styles.columns]: columns},
          {[styles.rotate]: rotate},
        )
      }
    >
      {children}
    </div>
  );
}
