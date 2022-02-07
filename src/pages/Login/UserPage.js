import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'


const UserPage = () =>{

    const loggedIn = useSelector((state)=> state.user.user.loggedIn)
    const user = useSelector((state) => state.user.user.userInfo)
    const [edit,setEdit] = useState(false)

    const editButton = () =>{
        setEdit(!edit)
    }

    if (loggedIn) {
        // if(!edit) 
        return(
            <div>
            User info:
            <div>
                Hi {user.name}!
            </div>
            <button type='button' onClick={editButton}>
                Edit information
            </button>
            {/* <ul>display name:{user.displayname}</ul> */}
            <ul>email: {user.email}</ul>
            <ul>Display Photo<img src={user.photoUrl} alt='No image'  /></ul>
        </div>
        // ) 
        // else return(
        //     <div>
        //         <input  />
        //     </div>
        )
    }
    else  return <Redirect to='/' />
}

export default UserPage