import React, { useState, useEffect } from 'react'
import ThriftingItem from './ThriftingItem'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../firebase/firebase.utils'

import './ThriftingPage.css'

const ThriftingPage = () => {
    
    const [items, setItems] = useState([])

    useEffect(()=>{
        // console.log('grabbing items objects')
        try{
            const querySnapshot = async () => {
                const data = await getDocs(collection(db, 'thrifting'))
                let itemsArr = []
                data.forEach((doc) =>{
                    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
                    itemsArr.push((doc.data()))
                })
                // console.log('done fetching data')
                setItems(itemsArr)
            }
            querySnapshot()
            // console.log('done setting data in state')

        } catch(err){
            console.log(err)
        }
    },[])

    // console.log('items in state', items)
    if (items.length>0) return(
        <div>
            {/* thrifting page */}
            {items.map((item, key)=>{
                // console.log('item in map', item)
                return <ThriftingItem key={key} item={item}  />
            })}
            {/* <ThriftingItem /> */}
        </div>
    )
    else return(
        <div>
            LOADING
        </div>
    )
}

export default ThriftingPage