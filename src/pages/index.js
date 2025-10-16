import Container from '@/components/Container';
import Head from 'next/head'
import TaskGroup from '@/components/TaskGroup';
import getProjects from '@/api/todoist/getProjects';
import getTasksByFilter from '@/api/todoist/getTasksByFilter';
import getTitleFromTemporal from '@/utils/getTitleFromTemporal';
import sortTasksByDate from '@/utils/sortTasksByDate';
import sortTasksByDayOrder from '@/utils/sortTasksByDayOrder';
import sortTasksByPriority from '@/utils/sortTasksByPriority';
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
        <TaskGroup {...taskGroup} projects={projects} key={taskGroup.title} />
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
          tasks: (await getTasksByFilter('!no date & overdue'))
            .toSorted(sortTasksByDayOrder)
            .toSorted(sortTasksByDate)
            .toSorted(sortTasksByPriority),
          showDate: true,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO()),
          tasks: (await getTasksByFilter('today'))
            .toSorted(sortTasksByDayOrder)
            .toSorted(sortTasksByDate)
            .toSorted(sortTasksByPriority),
          showDate: false,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 1})),
          tasks: (await getTasksByFilter('tomorrow'))
            .toSorted(sortTasksByDayOrder)
            .toSorted(sortTasksByDate)
            .toSorted(sortTasksByPriority),
          showDate: false,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 2})),
          tasks: (await getTasksByFilter('in 2 days'))
            .toSorted(sortTasksByDayOrder)
            .toSorted(sortTasksByDate)
            .toSorted(sortTasksByPriority),
          showDate: false,
        },
        {
          title: getTitleFromTemporal(Temporal.Now.plainDateISO().add({days: 3})),
          tasks: (await getTasksByFilter('in 3 days'))
            .toSorted(sortTasksByDayOrder)
            .toSorted(sortTasksByDate)
            .toSorted(sortTasksByPriority),
          showDate: false,
        },
      ],
    },
  };
}
