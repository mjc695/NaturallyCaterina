import logo from './logo.svg';

import {Route, Switch} from 'react-router-dom'

import Homepage from './pages/Homepage';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/'>{Homepage}</Route>
      </Switch>
    </div>
  );
}

export default App;
