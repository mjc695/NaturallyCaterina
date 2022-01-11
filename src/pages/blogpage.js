import { collection, getDocs } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import db from '../firebase/firebase.utils'

const Blogpage = () =>{
    const [blogData, setBlogData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        // db.collection('blog').onSnapshot((snapshot) =>{
        //     snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         data: doc.data()
        //     }))
        // })
        // console.log({blogData})
        console.log('fetching the data from db')
        try{
            const querySnapshot = async () => {
                const data = await getDocs(collection(db, 'blog'))
                let stateObj = {}
                data.forEach((doc) =>{
                    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
                   stateObj[doc.data().title] = doc.data().text
                })
                setBlogData(stateObj)
            }
            querySnapshot()
        } catch(err){
            console.log(err)
        }
        // setBlogData()
    }, [])
    console.log(blogData)


    if (loading) return(
        <div>
            Still Loading
        </div>
    ) 
    else return(
        <div>
            {Object.keys(blogData).map((title, key) => {
                return <Link to ={`/blog/${key}`}>{title}</Link>
            })}
        </div>
    )
}

export default Blogpage