import Head from 'next/head'
import TodoItem from '@/components/TodoItem';
import TodoItems from '@/components/TodoItems';
import getProjects from '@/api/todoist/getProjects';
import getTasksByFilter from '@/api/todoist/getTasksByFilter';
import getTitleFromTemporal from '@/utils/getTitleFromTemporal';
import {Temporal} from '@js-temporal/polyfill';
import {css, cx} from '@emotion/css';

export default function Dashboard(props) {
  const {
    projects = {},
    taskGroups = [],
  } = props;

  /**
   * Set to `true` to rotate the display 90º, so it appears vertically on the
   * reTerminal. Setting to `false` makes development a bit easier.
   */
  const rotate = true;

  const styles = {
    container: css`
      width: 480px;
      height: 800px;
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
    rotate: css`
      transform: rotate(90deg) translate(-160px, -160px);
    `,
  };

  return (
    <div className={cx(styles.container, {[styles.rotate]: rotate})}>
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
  return {
    props: {
      projects: await getProjects(),
      taskGroups: [
        {
          title: 'Overdue',
          tasks: await getTasksByFilter('!no date & overdue'),
          displayDate: true,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO()),
          tasks: await getTasksByFilter('today'),
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 1})),
          tasks: await getTasksByFilter('tomorrow'),
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 2})),
          tasks: await getTasksByFilter('in 2 days'),
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 3})),
          tasks: await getTasksByFilter('in 3 days'),
        },
      ],
    },
  };
}
