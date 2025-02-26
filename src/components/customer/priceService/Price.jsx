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
      title: "Schedule an Appointment",
      icon: "📋",
      description:
        "To manage your time efficiently and avoid long waiting times, you can book an appointment in two ways:",
      bullets: [
        "Fill out the registration form on the website.",
        "Call the Hotline 1900 3147.",
      ],
    },
    {
      number: "02",
      title: "Consultation & Examination",
      icon: "👨‍⚕️",
      description:
        "A dermatologist will examine your skin and conduct a skin analysis. Based on scientific assessment and your skin condition, the doctor will develop a suitable treatment plan.",
    },
    {
      number: "03",
      title: "Payment Process",
      icon: "💳",
      description:
        "Once you agree with the doctor's treatment plan, a consultant will provide detailed information again, and you can proceed with the payment.",
    },
    {
      number: "04",
      title: "Treatment Procedure",
      icon: "🏥",
      description:
        "You will be guided to the skincare treatment room to undergo the acne treatment process. For certain procedures, the doctor will perform the treatment directly.",
    },
    {
      number: "05",
      title: "Post-Treatment Care",
      icon: "👩‍⚕️",
      description:
        "At O2 SKIN, post-treatment care is a priority. You will receive detailed guidance on how to care for and protect your skin at home to prevent recurrence. Additionally, O2 SKIN is always available to answer any questions, even after your treatment is complete.",
    },
    {
      number: "06",
      title: "Follow-Up & Completion",
      icon: "🏣",
      description:
        "It's important to attend follow-up appointments as scheduled so that the doctor can monitor your progress closely and make any necessary adjustments to ensure optimal results.",
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
      <h1 className="price-title">Treatment Pricing Table</h1>
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
                  <div className="header-cell">Treatment Service</div>
                  <div className="header-cell">Service Price</div>
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
          Acne Treatment & Consultation Process at O2 SKIN
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
