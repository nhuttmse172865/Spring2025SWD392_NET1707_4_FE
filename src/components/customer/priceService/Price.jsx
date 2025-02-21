
import React from "react";
import "./Price.css";

const Price = () => {
  const categories = [
    { id: 1, name: "Facial Treatment" },
    { id: 2, name: "Body Care" },
    { id: 3, name: "Hair Treatment" },
    { id: 4, name: "Acne Treatment" },
    { id: 5, name: "Anti-Aging" },
    { id: 6, name: "Laser Therapy" },
  ];

  const services = [
    {
      id: 1,
      name: "Deep Cleansing Facial",
      category_id: 1,
      gap_day: 7,
      price: 500000,
      image: "/images/deep-cleansing.jpg",
    },
    {
      id: 2,
      name: "Hydrating Facial",
      category_id: 1,
      gap_day: 10,
      price: 600000,
      image: "/images/hydrating.jpg",
    },
    {
      id: 3,
      name: "Anti-Acne Facial",
      category_id: 1,
      gap_day: 14,
      price: 550000,
      image: "/images/anti-acne.jpg",
    },
    {
      id: 4,
      name: "Body Scrub",
      category_id: 2,
      gap_day: 7,
      price: 400000,
      image: "/images/body-scrub.jpg",
    },
    {
      id: 5,
      name: "Aromatherapy Massage",
      category_id: 2,
      gap_day: 14,
      price: 700000,
      image: "/images/aromatherapy.jpg",
    },
    // ... other services
  ];

  const steps = [
    {
      number: "01",
      title: "Đăng ký lịch khám",
      icon: "📋",
      description:
        "Để chủ động thời gian và không phải chờ đợi lâu, khách hàng có thể đặt lịch hẹn trước theo 2 cách:",
      bullets: ["Điền form đăng ký trên website.", "Gọi Hotline 1900 3147."],
    },
    {
      number: "02",
      title: "Khám và tư vấn",
      icon: "👨‍⚕️",
      description:
        "Khách hàng sẽ được bác sĩ chuyên khoa Da liễu trực tiếp khám và soi da. Sau đó, căn cứ theo góc độ khoa học và dựa trên thực trạng da của khách hàng, bác sĩ sẽ thiết lập phác đồ điều trị phù hợp.",
    },
    {
      number: "03",
      title: "Thanh toán chi phí",
      icon: "💳",
      description:
        "Khi đồng ý với phương án điều trị của bác sĩ, khách hàng sẽ được nhân viên tư vấn chi tiết một lần nữa và tiến hành thanh toán.",
    },
    {
      number: "04",
      title: "Thực hiện dịch vụ",
      icon: "🏥",
      description:
        "Khách hàng được hướng dẫn di chuyển đến Phòng chăm sóc da để thực hiện quy trình điều trị mụn. Với mỗi số dịch vụ nhất định, bác sĩ là người trực tiếp thực hiện.",
    },
    {
      number: "05",
      title: "Chăm sóc sau điều trị",
      icon: "👩‍⚕️",
      description:
        "Điều khác biệt tại O2 SKIN là sau điều trị, khách hàng sẽ được tư vấn tận tình về cách chăm sóc và bảo vệ da tại nhà nhằm ngăn ngừa tái phát. Ngoài ra, O2 SKIN cũng sẵn sàng giải đáp mọi thắc mắc của khách hàng ngay cả khi đã kết thúc liệu trình.",
    },
    {
      number: "06",
      title: "Tái khám và kết thúc liệu trình",
      icon: "🏣",
      description:
        "Khách hàng lưu ý nên tái khám đúng hẹn để bác sĩ theo dõi kết quả sát sao và có những thay đổi kịp thời, nhằm mang đến hiệu quả tối ưu.",
    },
  ];


  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="price-container">
      <h1 className="price-title">Bảng Giá Điều Trị</h1>
      <div className="price-categories">
        {categories.map((category) => {
          const categoryServices = services.filter(
            (service) => service.category_id === category.id
          );

          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="category-card">
              <h2 className="category-title">{category.name}</h2>

              <div className="service-table">
                <div className="table-header">
                  <div className="header-cell">Dịch vụ điều trị</div>
                  <div className="header-cell">Giá Dịch Vụ</div>
                </div>

                {categoryServices.map((service) => (
                  <div key={service.id} className="table-row">
                    <div className="service-cell">{service.name}</div>
                    <div className="price-cell">
                      {formatPrice(service.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="treatment-timeline">
        <h1 className="timeline-title">
          Quy Trình Thăm Khám & Điều Trị Mụn Tại O2 SKIN
        </h1>

        <div className="timeline-container">
          {steps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="step-number">
                <div className="number">{step.number}</div>
              </div>

              <div className="step-icon">
                <span className="icon">{step.icon}</span>
              </div>

              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.bullets && (
                  <ul>
                    {step.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Price;
