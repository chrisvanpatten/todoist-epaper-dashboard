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

      {taskGroups.map((taskGroup) => (
        <TodoItems {...taskGroup} projects={projects} key={taskGroup.title} />
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
          showDate: true,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO()),
          tasks: await getTasksByFilter('today'),
          showDate: false,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 1})),
          tasks: await getTasksByFilter('tomorrow'),
          showDate: false,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 2})),
          tasks: await getTasksByFilter('in 2 days'),
          showDate: false,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 3})),
          tasks: await getTasksByFilter('in 3 days'),
          showDate: false,
        },
      ],
    },
  };
}
