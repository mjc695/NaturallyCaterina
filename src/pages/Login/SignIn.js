import React, {useState, useEffect}from 'react'
import {Redirect} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userSignIn } from '../../firebase/firebase.utils'
import {fetchUser, fetchUserWithGoogleAuth, fetchAuthStatus} from '../../redux/loginSlice.js'
import Spinner from './Spinner'

const SignIn = () =>{

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const loggedIn = useSelector((state)=>state.user.user.loggedIn)
    const togggleSpinner = useSelector((state)=>state.user.user.status)


    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(fetchUser({email,password}))
        // loggedIn? history.push('/') : alert('There was an error logging in Please try again')
        dispatch(fetchAuthStatus())
    }
    
    const onGoogleSignIn = ()=>{
        console.log('signing in with google, passing on to redux')
        dispatch(fetchUserWithGoogleAuth())
        dispatch(fetchAuthStatus())
    }


    return(
        <div>
            <div>
                Login
            </div>
            {togggleSpinner==='loading'?<Spinner/> : null}
            {loggedIn===true? <Redirect to='/'/> : null}
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' placeholder='email address' onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' name='password' placeholder='password' minLength='8' required onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit'>Sign In</button>
            </form>
            <button type='button' onClick={onGoogleSignIn} >Google Sign IN</button>
        </div>
    )
}

export default SignIn