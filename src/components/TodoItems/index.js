import {css} from '@emotion/css';

export default function TodoItems(props) {
  const {
    children,
    title = '',
  } = props;

  const styles = {
    title: css`
      font-size: 15.5px;
      margin: 0;
      padding: 0 0 0.5em;
    `,
    todoItems: css`
      margin: 0 0 2em;
      padding: 0;

      border-top: 1px solid black;

      font-weight: 500;
      font-size: 15.5px;
    `,
  };
  
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.todoItems}>{children}</ul>
    </>
  );
}
