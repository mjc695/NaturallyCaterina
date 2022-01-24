import React from 'react'
import './ThriftingItem.css'

const ThriftingItem = ({item}) => {
    const {links,name,description} =item
    // const {name} = item
    // console.log('item in item,', item)
    console.log('item in item,',links, name, description)
    // console.log('name:', name)
    return(
        <div className='item-wrapper' >
            <h1>{name}</h1>
            {links.map((link,key)=>{
                return <img key={key} className='item-image' src={link} alt={link}/>
            })}
            <p>{description}</p>
            {/* {links, name, description} */}

        </div>
    )
}

export default ThriftingItem