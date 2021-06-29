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
        <Router> {/* delete when placeholder routes not needed */}
    <div className="App">
      <header className="App-header">
        <h1>Into the Black</h1>

        {/* placeholder */}
        <div>
          <Link to='/'>Welcome Screen</Link>
        </div>
        <div>
          <Link to='/play'>Game Container</Link>
        </div>
        <div>
          <Link to='/end'>End Screen</Link>
        </div>
        {/* placeholder */}

      </header>
      <main>
      {/*<Router>*/}
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
      {/*</Router>*/}
      </main>
    </div>
    {/* delete when placeholder routes not needed */}
    </Router> 
  );
}

export default App;
