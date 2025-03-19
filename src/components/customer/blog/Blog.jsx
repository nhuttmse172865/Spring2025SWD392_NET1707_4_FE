import React, { useEffect, useState } from "react";
import "./Blog.css";
import { Calendar, ArrowRight } from "lucide-react";
import BASE from "../../../constants/base";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/blog/getAll`);
      setBlogs(res.data.data);
      console.log(res.data.data)
    } catch (error) {
      message.error("Failed to fetch blogs!");
    } finally {
      setLoading(false);
    }
  };
  const handleClick = (article) => {
    navigate(`/blog/${article.id}`,{state:{post:article}})
  };
  return (
    <div className="beauty-container">
      <h1 className="beauty-title">Beauty Guide</h1>
      <div className="beauty-grid">
        {blogs.map((article) => (
          <div key={article.id} className="beauty-card"  onClick={() => handleClick(article)}
            style={{ cursor: "pointer" }} 
          >
          <img
  src={article.image || article.thumbnailUrl}
  alt={article.alt || "Blog image"}
  className="beauty-card-image"
/>
            <div className="beauty-card-content">
              <h2 className="beauty-card-title">
                <a className="beauty-card-link">
                  {article.title}
                </a>
              </h2>
              <p className="beauty-card-description">{article.summary}</p>
              <div className="beauty-card-footer">
                <span> {article.authorName}</span>
                <span>{new Date(article.createdTime).toLocaleDateString("vi-VN")}</span>

                <span className="beauty-arrow-icon">
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
