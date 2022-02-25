import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { fetchBlog } from '../../firebase/firebase.utils'
import { fetchAllBlogs } from '../../redux/blogSlice'

import './SingleBlog.css'

const SingleBlog = (params) =>{
    const dispatch = useDispatch()
    let blog
    const blogs = useSelector(state => state.blog.blogList)
    // console.log(params.match.params.id)
    if (blogs.length<1) dispatch(fetchAllBlogs())
    else blog = blogs[params.match.params.id]
    // const blogs = useSelector(state => state.blog.blogList)
    // console.log('match', params.match.params.id)
    // console.log(blog)
    if (blog) return(
        <div>
            <div className='blog-title'>
                {blog.title}
            </div>
            single blog page
            <div className='blog-text'>
                {blog.text}
            </div>
        </div>
    )
    else return(
        <div>
            still loading
            {/* still loading page */}
        </div>
    )

}

export default SingleBlog