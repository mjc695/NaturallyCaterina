import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux'
import Logout from '../pages/Login/Logout'

const Navbar = () =>{

    const loggedIn = useSelector((state)=>state.user.user.loggedIn)

    return(
        <div className='nav-wrapper'>
            <div className='nav-logo'>
                <img className='logo' src='/caterina-C.jpg' alt='/caterina-C.jpg'></img>
            </div>
            <div className='nav-buttons-wrapper'>
                <div className='nav-buttons'>
                    <Link className='nav-button' to='/'>
                        Home
                    </Link>
                    <Link className='nav-button' to='/blog'>
                        Blog
                    </Link>
                    <Link className='nav-button' to='/about'>
                        About
                    </Link>
                    <Link className='nav-button' to='/thrifting'>
                        Thrifting
                    </Link>
                    <Link className='nav-button' to='/N'>
                        SEED
                    </Link>
                    {loggedIn?(
                        <div>
                            <Link className='nav-button' to='/user' >UserPage</Link>
                            {/* <Link className='logout-button' to='/logout'>Logout</Link>  */}
                            {/* ADD LOGOUT TO BE PART OF A USER MENU IN DROPDOWN */}
                            <Logout />
                        </div>
                        ): (
                            <div>
                            <Link className='nav-button' to='/signin'>SignIn</Link>
                            </div>
                            )}
                </div>
            </div>
        </div>    
    )
}

export default Navbar