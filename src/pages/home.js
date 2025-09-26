import Head from 'next/head'
import TodoItem from '@/components/TodoItem';
import TodoItems from '@/components/TodoItems';
import getEvents from '@/api/calendar/getEvents';
import getProjects from '@/api/todoist/getProjects';
import getTasksByFilter from '@/api/todoist/getTasksByFilter';
import getTitleFromTemporal from '@/utils/getTitleFromTemporal';
import {Temporal} from '@js-temporal/polyfill';
import {css, cx} from '@emotion/css';

export default function Dashboard(props) {
  const {
    events = '',
    projects = {},
    taskGroups = [],
  } = props;

  console.log(events);

  const styles = {
    container: css`
      width: 800px;
      height: 480px;
      padding: 0.4em 0.5em;
      margin: 0;

      .twemoji {
        width: auto;
        height: 1em;
        display: inline-block;
        position: relative;
        top: 2px;
      }
    `,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>

      {taskGroups.map((group) => (
        <TodoItems title={group.title} key={group.title}>
          {group.tasks.map((task) => (
            <TodoItem
              key={task.id}
              dueDate={group?.displayDate && task.due.date}
              project={projects?.[task.projectId]}
            >
              {task.content}
            </TodoItem>
          ))}
        </TodoItems>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const events = await getEvents();
  console.log(events);
  return {
    props: {
      events: events,
      projects: await getProjects(),
      taskGroups: [
        {
          title: 'Family',
          tasks: await getTasksByFilter('#👫 Family'),
          displayDate: true,
        },
      ],
    },
  };
}
