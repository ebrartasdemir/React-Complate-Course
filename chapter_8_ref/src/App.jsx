import Player from './components/Player.jsx';
import TimerChallenger from './components/TimerChallenger.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
      <TimerChallenger time={1} title="easy"/>
      <TimerChallenger time={5} title="not that easy"/>
      <TimerChallenger time={7} title="medium"/>
      <TimerChallenger time={10} title="hard"/>
      </div>
    </>
  );
}

export default App;
