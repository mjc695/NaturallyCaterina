import React from 'react'

import './Homepage.css'

const Homepage = () => {
    return(
        <div className='homepage-container'>
            <h1 className='homepage-title'>Welcome to Caterina's Website :)</h1>
            <img className = 'main-picture' src={process.env.PUBLIC_URL +'/homepage_picture.jpg'} alt=''/>
            <div className='introduction'>
                Hello, this is where Caterina will welcome and explain her website to people! 
                Learn about all of the plants here :)
            </div>
        </div>
    )
}

export default Homepage