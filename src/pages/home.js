import Head from 'next/head';
import Container from '@/components/Container';
import Event from '@/components/Event';
import Events from '@/components/Events';
import TaskGroup from '@/components/TaskGroup';
import getEvents from '@/api/calendar/getEvents';
import getProjects from '@/api/todoist/getProjects';
import getTasksByFilter from '@/api/todoist/getTasksByFilter';
import getTitleFromTemporal from '@/utils/getTitleFromTemporal';
import {Temporal} from '@js-temporal/polyfill';

export default function Dashboard(props) {
  const {
    events = [],
    projects = {},
    taskGroups = [],
  } = props;

  return (
    <Container orientation="horizontal" columns={true}>
      <Head>
        <title>Dashboard</title>
      </Head>

      <section>
        {taskGroups.map((taskGroup) => (
          <TaskGroup {...taskGroup} projects={projects} key={taskGroup.title} />
        ))}
      </section>

      <Events events={events} />
    </Container>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      events: await getEvents(),
      projects: await getProjects(),
      taskGroups: [
        {
          title: 'Family',
          tasks: await getTasksByFilter('#👫 Family'),
          showDate: true,
          showProject: true,
        },
        {
          title: 'Shopping List',
          tasks: await getTasksByFilter('#🛒 Shopping List'),
          showDate: false,
          showProject: false,
        },
      ],
    },
  };
}
