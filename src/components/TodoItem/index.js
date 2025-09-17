import DueDate from '@/components/DueDate';
import Markdown from 'react-markdown'
import Metadata from '@/components/Metadata';
import Project from '@/components/Project';
import Twemoji from 'react-twemoji';
import {css} from '@emotion/css';

export default function TodoItem(props) {
  const {
    children,
    dueDate = null,
    project = null,
  } = props;

  const styles = {
    todoItem: css`
      list-style: none;
      padding: 0.5em 0;
      margin: 0;
      border-bottom: 1px solid black;
      display: flex;
    `,
    checkbox: css`
      width: 1.2em;
      height: 1.2em;
      border: 1px solid black;
      border-radius: 100%;
    `,
    content: css`
      flex: 1;
      overflow: hidden;
      overflow-wrap: break-word;
      margin-left: 0.5em;

      p {
        margin: 0;
      }
    `,
  };

  return (
    <li className={styles.todoItem}>
      <div className={styles.checkbox} />
      <div className={styles.content}>
        <Twemoji options={{className: 'twemoji'}}><Markdown>{children}</Markdown></Twemoji>
        {(dueDate || project) && (
          <Metadata>
            {dueDate && <DueDate dueDate={dueDate} />}
            {project && <Project project={project} />}
          </Metadata>
        )}
      </div>
    </li>
  );
}
