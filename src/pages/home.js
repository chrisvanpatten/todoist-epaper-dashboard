import Head from 'next/head';
import Block from '@/components/Block';
import Container from '@/components/Container';
import Event from '@/components/Event';
import Events from '@/components/Events';
import TodoItem from '@/components/TodoItem';
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

  return (
    <Container orientation="horizontal" columns={true}>
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
