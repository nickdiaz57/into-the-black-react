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

//move Into the Black title into header, format properly

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Into the Black</h1>
      </header>
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
