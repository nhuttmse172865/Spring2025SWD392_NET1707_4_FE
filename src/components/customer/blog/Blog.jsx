import React from "react";
import "./Blog.css";
import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Hướng dẫn các bước skin care cơ bản chi tiết tại nhà...",
    description:
      "Các bước skincare đúng cách giúp bạn sở hữu ngay làn da không tuổi, mịn màng và ...",
    rating: 4.5,
    image: "https://placehold.co/600x400",
    alt: "A person receiving a facial treatment",
  },
  {
    id: 2,
    title: "Massage đúng cách giúp trẻ hoá làn da",
    description:
      "Bạn lo lắng về tình trạng lão hóa da do các nguyên nhân về tuổi tác cũng như khói b...",
    rating: 4.0,
    image:
      "https://storage.googleapis.com/a1aa/image/1vuiN2Wf9_hN6R9WLy5tiC5BxUd-BRbjspwPJs0ghsE.jpg",
    alt: "A person receiving a massage",
  },
  {
    id: 3,
    title: "Tẩy tế bào chết là gì? có nên dùng BHA để tẩy tế...",
    description:
      "Mỗi ngày, có hàng triệu tế bào mới được hình thành qua quá trình phân bào. Quá tr...",
    rating: 4.8,
    image:
      "https://storage.googleapis.com/a1aa/image/TeeomNeioX9u-dSDKxcgZqIxUnBfR8YxdhGMJRRvxXQ.jpg",
    alt: "Foot exfoliation treatment",
  },
  {
    id: 4,
    title: "Bài viết demo hiển thị sản phẩm trong nội dung bài...",
    description:
      "Một số giày dưỡng như da trơn, chất vải đừng quen thuộc, đối với các chị em phụ nữ...",
    rating: 4.2,
    image:
      "https://storage.googleapis.com/a1aa/image/49g_lanCebRIbGCnZsrfSLTxtYTnr189_mqsSpSnwa0.jpg",
    alt: "Spa products on a table",
  },
  {
    id: 5,
    title: "Bí quyết bảo vệ da trước các tác nhân gây lão hoá",
    description:
      "Lão hóa da đến sớm hay muộn còn tùy thuộc vào các thói quen chăm sóc da và thói quen s...",
    rating: 4.7,
    image:
      "https://storage.googleapis.com/a1aa/image/GNrb9c33_BACajCiqVYVf1bOaqz17tgAILeTXwMMBbY.jpg",
    alt: "A relaxing spa environment",
  },
  {
    id: 6,
    title: "Bí quyết tẩy tế bào chết vật lý dịu nhẹ hiệu quả",
    description:
      "Tẩy tế bào chết là bước làm sạch quan trọng cho quá trình dưỡng da. Bước này loại...",
    rating: 4.6,
    image:
      "https://storage.googleapis.com/a1aa/image/oLZv77Qo0eLCY9Qtc-bikRR2KtW-m1JE5eeq8DVh-h4.jpg",
    alt: "A person with a facial mask",
  },
];

const Blog = () => {
  return (
    <div className="beauty-container">
      <h1 className="beauty-title">Cẩm nang làm đẹp</h1>
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
