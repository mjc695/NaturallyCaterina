import React, {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Homepage from './pages/Homepage';
import './App.css';
import Navbar from './components/Navbar';
import AboutPage from './pages/Aboutpage';
import Blogpage from './pages/Blogpage'

function App() {




  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/about' component={AboutPage} />
        <Route path='/blog' component={Blogpage} />
        <Route exact path='/' component={Homepage} />
        <Redirect to='/' />
        {/* <Redirect from='/:' to ='/'></Redirect> */}
      </Switch>
    </div>
  );
}

export default App;
