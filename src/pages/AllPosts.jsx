import React from 'react'
import { PostCard, Container } from '../components'
import service from '../appwrite/config'
import { useState, useEffect } from 'react'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getPosts()
         .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
         })
         .catch((err)=>{console.log(err);})
    }, [])
    
  return (
    <div className=' w-full py-8'>
        <Container>
            <div className='flex flex-wrap justify-center'>
                {
                  
                    posts.map((post)=>(
                      <div key={post.$id} className=' p-2 w-1/4'>
                        <PostCard {...post} /> 
                      </div>  
                    ))
                }
                
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
