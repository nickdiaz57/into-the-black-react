import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


import WelcomeScreen from './components/welcome/welcomeScreen'
import GameContainer from './components/game/gameContainer';
import EndScreen from './components/end/endScreen';
//fix routes so player proceeds into game when submitting name form on welcome screen
//player should proceed to end screen route after game completion
//nest game route to be /user/id:/play, same with end screen

function App() {
  return (
    <div className="App">
      <main>
      <Router>
        <Switch>
          <Route exact path='/'>
            <WelcomeScreen/>
          </Route>
          <Route path='/play'>
            <GameContainer/>
          </Route>
          <Route path='/end'>
            <EndScreen/>
          </Route>
        </Switch>
      </Router>
      </main>
    </div>
  );
}

export default App;
