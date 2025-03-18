import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./BlogDetails.css";
import axios from "axios";
import BASE from "../../../../constants/base";



const BlogDetails = () => {
  const { id } = useParams(); 
  
 
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();
  if (!post) {
    return (
      <div className="blog-container">
        <h2>Không tìm thấy bài viết!</h2>
        <button onClick={() => navigate("/blog")}>Back</button>
      </div>
    );
  }
 

  return (
    <div className="blog-container">
      <h1 className="blog-title">{post?.title}</h1>
      <h2 className="blog-headline">{post?.headline}</h2>
      <img className="blog-image"  src={post?.image || post?.thumbnailUrl} alt={post?.title} />
    <div className="blog-content">{post?.content}</div>
      <h1>{post?.summary}</h1>
    </div>
  );
};

export default BlogDetails;
