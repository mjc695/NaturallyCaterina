import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/loginSlice'
import './Logout.css'

const Logout = () => {
    const dispatch = useDispatch()
    const onLogout = async () =>{
        await dispatch(logoutUser());
    }
    return(
        <div>
            <button type='button' onClick={onLogout}>Logout</button>
        </div>
    )
}

export default Logout