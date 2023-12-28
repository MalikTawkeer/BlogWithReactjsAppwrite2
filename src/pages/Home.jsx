import React from "react";
import { useEffect, useState } from "react";
import service from "../appwrite/config.js";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      setPosts(posts.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className=" text-2xl">
              <h1 className=" text-2xl font-bold hover:text-gray-200">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {posts.map((post) => (
        <div key={post.$id} className="p-2 w-1/4">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
