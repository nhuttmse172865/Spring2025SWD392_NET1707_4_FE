import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="blog-container">
        <h2>Not found</h2>
        <button onClick={() => navigate("/blog")}>Back</button>
      </div>
    );
  }

  const parsedContent = Array.isArray(post.content) ? post.content : [];

  // try {
  //   parsedContent = JSON.parse(post.content);
  // } catch (error) {
  //   console.error("Error parsing content:", error);
  // }

  return (
    <div className="blog-container">
      <h1 className="blog-title">{post?.title}</h1>
      <h2 className="blog-headline">{post?.headline}</h2>
      <img className="blog-image" src={post?.image || post?.thumbnailUrl} alt={post?.title} />
      
      <div className="blog-content">
        {parsedContent.length > 0 ? (
          parsedContent.map((section, index) => (
            <div key={index} className="blog-section">
              <h3 className="blog-section-title">{section.title}</h3>
              <p>{section.detail}</p>
            </div>
          ))
        ) : (
          <p>No content available.</p>
        )}
      </div>

      <h1>{post?.summary}</h1>
    </div>
  );
};

export default BlogDetails;
