import DueDate from '@/components/DueDate';
import Markdown from 'react-markdown'
import Metadata from '@/components/Metadata';
import Project from '@/components/Project';
import Twemoji from 'react-twemoji';
import {css, cx} from '@emotion/css';

export default function Task(props) {
  const {
    children,
    dueDate = null,
    project = null,
    priority = 0,
  } = props;

  const styles = {
    task: css`
      list-style: none;
      padding: 0.5em 0 0.6em;
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
    checkboxHighPriority: css`
      border: 2px solid black;
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
    <li className={styles.task}>
      <div className={cx(styles.checkbox, {[styles.checkboxHighPriority]: priority === 4})} />
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
