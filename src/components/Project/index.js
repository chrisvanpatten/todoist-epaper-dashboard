import Twemoji from 'react-twemoji';

export default function Project(props) {
  const {
    project,
  } = props;

  return (
    <div>
      <Twemoji options={{className: 'twemoji'}}>{project}</Twemoji>
    </div>
  );
}
