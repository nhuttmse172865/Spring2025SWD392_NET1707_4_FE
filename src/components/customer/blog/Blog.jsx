import React from "react";
import "./Blog.css";
import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Step-by-Step Guide to Basic Skincare at Home...",
    description:
      "Proper skincare steps help you achieve youthful, smooth skin...",
    rating: 4.5,
    image: "https://placehold.co/600x400",
    alt: "A person receiving a facial treatment",
  },
  {
    id: 2,
    title: "Proper Massage Techniques for Rejuvenating Your Skin",
    description:
      "Worried about skin aging due to age and environmental factors...",
    rating: 4.0,
    image:
      "https://storage.googleapis.com/a1aa/image/1vuiN2Wf9_hN6R9WLy5tiC5BxUd-BRbjspwPJs0ghsE.jpg",
    alt: "A person receiving a massage",
  },
  {
    id: 3,
    title: "What is Exfoliation? Should You Use BHA for It?",
    description:
      "Every day, millions of new skin cells are formed through cell division...",
    rating: 4.8,
    image:
      "https://storage.googleapis.com/a1aa/image/TeeomNeioX9u-dSDKxcgZqIxUnBfR8YxdhGMJRRvxXQ.jpg",
    alt: "Foot exfoliation treatment",
  },
  {
    id: 4,
    title: "Demo Article on Displaying Products in Blog Content...",
    description:
      "Some skincare products, such as smooth leather or fabric-based items...",
    rating: 4.2,
    image:
      "https://storage.googleapis.com/a1aa/image/49g_lanCebRIbGCnZsrfSLTxtYTnr189_mqsSpSnwa0.jpg",
    alt: "Spa products on a table",
  },
  {
    id: 5,
    title: "Secrets to Protecting Your Skin from Aging Factors",
    description:
      "The speed of skin aging depends on your skincare habits and daily routine...",
    rating: 4.7,
    image:
      "https://storage.googleapis.com/a1aa/image/GNrb9c33_BACajCiqVYVf1bOaqz17tgAILeTXwMMBbY.jpg",
    alt: "A relaxing spa environment",
  },
  {
    id: 6,
    title: "Gentle and Effective Physical Exfoliation Tips",
    description:
      "Exfoliation is a crucial cleansing step in skincare. This process removes...",
    rating: 4.6,
    image:
      "https://storage.googleapis.com/a1aa/image/oLZv77Qo0eLCY9Qtc-bikRR2KtW-m1JE5eeq8DVh-h4.jpg",
    alt: "A person with a facial mask",
  },
];

const Blog = () => {
  return (
    <div className="beauty-container">
      <h1 className="beauty-title">Beauty Guide</h1>
      <div className="beauty-grid">
        {articles.map((article) => (
          <div key={article.id} className="beauty-card">
            <img
              src={article.image}
              alt={article.alt}
              className="beauty-card-image"
            />
            <div className="beauty-card-content">
              <h2 className="beauty-card-title">
                <a href={`/blog/${article.id}`} className="beauty-card-link">
                  {article.title}
                </a>
              </h2>
              <p className="beauty-card-description">{article.description}</p>
              <div className="beauty-card-footer">
                <span>⭐ {article.rating}</span>
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
