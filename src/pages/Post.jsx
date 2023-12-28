import React, { useState, useEffect, useImperativeHandle } from "react";
import service from "../appwrite/config.js";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  console.log(isAuthor);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(slug).then((status) => {
      if (status) {
        service.deleteFile(post.fetaturedImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className=" py-8">
      <Container>
        <div className=" w-full flex justify-center mb-4 relative border rounded-lg p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className=" rounded-xl w-1/2"
          />

          {isAuthor && (
            <div className=" absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className=" mr-3 font-bold hover:bg-green-400">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost} className="font-bold hover:bg-red-400">
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className=" text-2xl font-bold">
            {post.title}
          </h1>
        </div>
        <div className="browser-css">
          {parse(post.content)}
        </div>


      </Container>
    </div>
  ) : null;
}

export default Post;
