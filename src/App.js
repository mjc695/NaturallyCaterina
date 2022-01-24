import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Homepage from './pages/Homepage';
import './App.css';
import Navbar from './components/Navbar';
import AboutPage from './pages/Aboutpage';
import Blogpage from './pages/Blogpage'
import ThriftingPage from './pages/Thrifting/ThriftingPage';
import SeedThrifts from './SeedThrifts'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/about' component={AboutPage} />
        <Route path='/blog' component={Blogpage} />
        <Route path='/thrifting' component={ThriftingPage} />
        <Route path='/n' component={SeedThrifts} />
        <Route exact path='/' component={Homepage} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
