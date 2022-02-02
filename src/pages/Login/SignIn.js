import React, {useState, useEffect}from 'react'
import { userSignIn } from '../../firebase/firebase.utils'

const SignIn = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        userSignIn(email,password)
    }

    return(
        <div>
            <div>
                Login
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' placeholder='email address' onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' name='password' placeholder='password' minLength='8' required onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit'>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn