import Head from 'next/head'
import Container from '@/components/Container';
import TodoItem from '@/components/TodoItem';
import TodoItems from '@/components/TodoItems';
import getProjects from '@/api/todoist/getProjects';
import getTasksByFilter from '@/api/todoist/getTasksByFilter';
import getTitleFromTemporal from '@/utils/getTitleFromTemporal';
import {Temporal} from '@js-temporal/polyfill';

export default function Dashboard(props) {
  const {
    projects = {},
    taskGroups = [],
  } = props;

  return (
    <Container orientation="vertical" rotate={true}>
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
    </Container>
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
