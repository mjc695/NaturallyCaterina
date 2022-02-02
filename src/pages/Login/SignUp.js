import React, {useState, useEffect}from 'react'
import { userSignUp } from '../../firebase/firebase.utils'

const SignUp = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        userSignUp(email,password)
    }

    return(
        <div>
            <div>
                Sign Up
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' placeholder='email address' required onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' name='password' placeholder='password' minLength='8' required onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit'>Create account</button>
            </form>
        </div>
    )
}

export default SignUp