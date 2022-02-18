import React, {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import AboutPage from './pages/Aboutpage';
import Blogpage from './pages/Blogpage'
import ThriftingPage from './pages/Thrifting/ThriftingPage';
import SeedThrifts from './SeedThrifts'
import SignIn from './pages/Login/SignIn'
import SignUp from './pages/Login/SignUp'
import UserPage from './pages/Login/UserPage';
import {fetchAuthStatus, logInUser} from './redux/loginSlice'
import {auth} from './firebase/firebase.utils'

function App() {

  // const dispatch = useDispatch()
  // const cookies = new Cookies()
  // const [userToken,setUserToken] = useState('')
  // const [user,setUser] = useState({})

  const dispatch = useDispatch()

  let unsubscribeFromAuth = null

  const user = useSelector((state) => state.user.user.userInfo)

  useEffect(()=>{
    unsubscribeFromAuth = auth.onAuthStateChanged(userResponse=>{
      console.log('logged In?', userResponse)
      dispatch(fetchAuthStatus())
    }) 
    return function cleanup(){
      unsubscribeFromAuth()
    }
  },[])

  // if(user) console.log('user in app', user)
  // console.log('user in app', user)

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/about' component={AboutPage} />
        <Route path='/blog' component={Blogpage} />
        <Route path='/thrifting' component={ThriftingPage} />
        <Route path='/n' component={SeedThrifts} />
        <Route path='/signIn' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route exact path='/' component={Homepage} />
        <Route path='/user' component={UserPage} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
