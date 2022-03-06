import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { updateUser } from '../../redux/loginSlice'


const UserPage = () =>{

    const dispatch = useDispatch()

    const loggedIn = useSelector((state)=> state.user.user.loggedIn)
    const user = useSelector((state) => state.user.user.userInfo)

    const [edit,setEdit] = useState(false)
    const [name,setName] = useState(user.name || '')
    const [photoUrl, setPhotoUrl] = useState(user.displayPhotoUrl || '')


    const toggleEdit = () =>{

        setEdit(!edit)
    }

    // useEffect(()=>{
    //     setName(user.name)
    // },[])
    

    const onEditSubmit = () =>{
        console.log('submitting', user.userId)
        const userData = {name, userId:user.userId, photoUrl}
        dispatch(updateUser(userData))
        setEdit(!edit)
    }

    // console.log('name', name)
    if (loggedIn) {
        if(edit) {
            return(
                <form onSubmit={onEditSubmit}>
                    <ul onClick={toggleEdit}>X</ul> 
                    User Info:
                    <div>
                    Name: <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                    <ul>email: {user.email}</ul>
                    <ul>name: {name}</ul>
                    <ul>Display Photo<img src={photoUrl} alt='No image'  />
                    <input type='text' name='photoUrl' value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} />
                    </ul>
                    <button type='submit' onClick={onEditSubmit}>Submit Edit</button>
                    </div>
                </form>
            )
        } else{
         return(
                <div>
            User info:
            <div>
                Hi {user.name}!
            </div>
            <button type='button' onClick={toggleEdit}>
                Edit information
            </button>
            {/* <ul>display name:{user.displayname}</ul> */}
            <ul>email: {user.email}</ul>
            <ul>name: {name}</ul>
            <ul>Display Photo<img src={photoUrl} alt='No image'  /></ul>
        </div>
        // ) 
        // else return(
            //     <div>
            //         <input  />
            //     </div>
            )
        }
    }
    else  return <Redirect to='/' />
}

export default UserPage