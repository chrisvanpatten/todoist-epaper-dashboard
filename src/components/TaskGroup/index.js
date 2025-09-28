import {css} from '@emotion/css';
import Task from '@/components/Task';

export default function TaskGroup(props) {
  const {
    title = '',
    tasks = [],
    projects = [],
    showDate = true,
    showProject = true,
  } = props;

  const styles = {
    title: css`
      font-size: 15.5px;
      margin: 0;
      padding: 0 0 0.5em;
    `,
    taskGroup: css`
      margin: 0 0 2em;
      padding: 0;

      border-top: 1px solid black;

      font-weight: 500;
      font-size: 15.5px;
    `,
  };
  
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.taskGroup}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            dueDate={showDate && task?.due?.date}
            project={showProject && projects?.[task.projectId]}
          >
            {task.content}
          </Task>
        ))}
      </ul>
    </div>
  );
}
