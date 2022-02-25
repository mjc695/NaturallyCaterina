import { collection, getDocs } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import db from '../../firebase/firebase.utils'
import { fetchAllBlogs } from '../../redux/blogSlice'

const BlogPage = () =>{
    // const [blogData, setBlogData] = useState({})
    // const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    // const allblogstuff = useSelector(state=> state.blog)
    const blogData = useSelector(state => state.blog.blogList)
    const loading = useSelector(state=>state.blog.status)

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
            dispatch(fetchAllBlogs())
            // const querySnapshot = async () => {
            //     const data = await getDocs(collection(db, 'blog'))
            //     let stateObj = {}
            //     data.forEach((doc) =>{
            //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
            //        stateObj[doc.data().title] = doc.data().text
            //     })
            //     setBlogData(stateObj)
            // }
            // querySnapshot()
        } catch(err){
            console.log(err)
        }

        // setLoading(!loading)
        // setBlogData()
    }, [])
    // console.log('allblogstuff:', allblogstuff)
    // console.log('blog data in page', blogData)
    // console.log('loading screen?', loading)


    if (loading!=='idle') return(
        <div>
            Still Loading
            {/* spinner component when ready */}
        </div>
    ) 
    else return(
        <div>
            {blogData.map((blogItem,key)=>{
                return <Link key={key} to={`/blog/${key}`} >{blogItem.title}</Link>
            })}
            {/* {Object.keys(blogData).map((title, key) => {
                return <Link key={key} to ={`/blog/${key}`}>{title}</Link>
             })} */}
        </div>
    )
}

export default BlogPage