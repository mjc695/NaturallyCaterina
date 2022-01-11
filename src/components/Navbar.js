import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'

import './Navbar.css'

const Navbar = () =>{
    return(
        <div className='nav-wrapper'>
            <div className='nav-logo'>
                <img className='logo' src='/caterina-C.jpg' alt='/caterina-C.jpg'></img>
            </div>
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
            </div>
        </div>    
    )
}

export default Navbar