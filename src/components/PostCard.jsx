import React from 'react'
import service from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  console.log($id, title ,featuredImage);
  return (
    <Link to={`/post/${$id}`}>
        <div className=' bg-white shadow-md rounded-lg p-4 hover:shadow-lg'>
            <div className=' justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} 
                className=' rounded-xl'/>
            </div>
            <h2 className=' font-bold md:text-xl'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
