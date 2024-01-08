import React from 'react'
import { PostCard, Container } from '../components'
import service from '../appwrite/config'
import { useState, useEffect } from 'react'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)


    useEffect(()=>{
      (async ()=>{
        try {
          setLoader(true)
          const res = await service.getPosts([])
          if(posts) setPosts(res.documents)
          setLoader(false)
        } catch (error) {
          console.log(error);
          setLoader(false)
        }
        }) ()
    }, [])

    
  return (
    <div className=' w-full py-8'>
        <Container>
          {loader && <h1><strong>Loading...</strong></h1>}
            <div className='flex flex-wrap justify-evenly items-center'>
                {
                  
                    posts.map((post)=>(
                      <div key={post.$id} className=' p-2 w-1/1 sm:w-1/2 md:w-1/4'>
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
