import Head from 'next/head';
import Container from '@/components/Container';
import Event from '@/components/Event';
import Events from '@/components/Events';
import TodoItems from '@/components/TodoItems';
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

  console.log(events.slice(0, 3));

  return (
    <Container orientation="horizontal" columns={true}>
      <Head>
        <title>Dashboard</title>
      </Head>

      {taskGroups.map((taskGroup) => (
        <TodoItems {...taskGroup} projects={projects} key={taskGroup.title} />
      ))}

      <Events>
        {events.map((event) => <Event {...event} key={event.summary} />)}
      </Events>
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
          displayDate: true,
        },
      ],
    },
  };
}
