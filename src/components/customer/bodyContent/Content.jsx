
import React, { useState } from 'react';
import './Content.css';
import { CheckCircle } from "lucide-react";
import IMAGES from "../../../constants/images";

const Content = () => {
  const doctors = [
    {
      id: 1,
      name: 'Emely jonson',
      role: 'Chuyên viên massage',
      description: 'Chuyên gia với hơn 5 năm kinh nghiệm trong lĩnh vực massage trị liệu. Được đào tạo chuyên sâu về các phương pháp massage.'
    },
    {
      id: 2,
      name: 'Lola Jonson',
      role: 'Chuyên viên chăm sóc da',
      description: 'Chuyên gia thẩm mỹ với kinh nghiệm trong việc điều trị các vấn đề về da. Thành thạo nhiều kỹ thuật chăm sóc da tiên tiến.'
    },
    {
      id: 3,
      name: 'Rose Marian',
      role: 'Chuyên viên chăm sóc da',
      description: 'Chuyên gia với chứng chỉ quốc tế về thẩm mỹ và chăm sóc da. Có kinh nghiệm trong việc điều trị mọi loại da.'
    },
    {
      id: 4,
      name: 'Rose Marian',
      role: 'Chuyên viên chăm sóc da',
      description: 'Chuyên gia thẩm mỹ với nhiều năm kinh nghiệm trong lĩnh vực chăm sóc da cao cấp. Thành thạo các kỹ thuật điều trị da hiện đại.'
    }
  ];


  const services = [
    {
      icon: <CheckCircle color="white" size={24} />,
      title: "Caring for Your Skin"
    },
    {
      icon: <CheckCircle color="white" size={24} />,
      title: "Intensive Treatment"
    },
    {
      icon: <CheckCircle color="white" size={24} />,
      title: "Specialized Treatment Products"
    },
    {
      icon: <CheckCircle color="white" size={24} />,
      title: "Free Skin Examination and Consultation"
    },
    {
      icon: <CheckCircle color="white" size={24} />,
      title: "Modern Equipment"
    },
    {
      icon: <CheckCircle color="white" size={24} />,
      title: "Experienced Technicians"
    }
  ];
  return (
    <div className="salon-container">
      <section className="salon-section">
        <div className="content-wrapper">
          <div className="image-section">
            <div className="pink-circle"></div>
            <div className="image-wrapper">
              <img src={IMAGES.skinBackground} className="model-image" />
            </div>
          </div>

          <div className="text-section">
            <span className="tag">BEAUTY SALON</span>

            <h1 className="main-title">
              Glow Your Face <br />
              & Vitality With <br />
              Our Best Service
            </h1>

            <ul className="services-list">
              <li>
                <span className="bullet">✦</span>
                Facials and skin care treatments, hair-cutting.
              </li>
              <li>
                <span className="bullet">✦</span>
                Waxing and other forms of hair removal, nail treatments.
              </li>
              <li>
                <span className="bullet">✦</span>
                Complementary care such as aromatherapy, massages.
              </li>
            </ul>

            <div className="button-group">
              <button className="btn primary">Book Appointment</button>
              <button className="btn secondary">Know Our Services</button>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="image-grid">
            <div className="image-item cucumber">
              <img src={IMAGES.skinBackground1} alt="Cucumber treatment" />
            </div>
            <div className="image-item mask">
              <img src={IMAGES.skinBackground2} alt="Face mask treatment" />
            </div>
            <div className="image-item massage">
              <img src={IMAGES.skinBackground3} alt="Face massage" />
            </div>
          </div>

          <div className="about-content">
            <span className="about-tag">ABOUT US</span>

            <h2 className="about-title">
              Beauty is about being comfortable in your own skin
            </h2>

            <p className="about-description">
              The quality or aggregate of qualities in a person or thing that gives pleasure to the senses or pleasurably exalts the mind or spirit: loveliness. A woman of great physical beauty exploring the natural beauty of the island, where the golden rays of the sun gently kiss the shimmering waves of the ocean. The scent of blooming flowers fills the air, creating an atmosphere of serenity and charm. Beauty is not just about appearances; it is the essence of confidence, kindness, and grace. It radiates from within, shining through every smile, every act of compassion, and every expression of joy.
            </p>

            <button className="learn-more-btn">
              Learn more
            </button>
          </div>
        </div>
      </section>

      <section className="spa-services">
        <div className="services-container">
          <div className="services-images">
            <div className="image-grid1">
              <img src={IMAGES.skinBackground1} alt="Massage" className="massage-img" />
              <img src={IMAGES.skinBackground2} alt="Aromatherapy" className="aroma-img" />
              <img src={IMAGES.skinBackground3} alt="Facial tools" className="tools-img" />
            </div>
          </div>

          <div className="services-content">
            <h2 className="services-title">
              Building physical and mental health
            </h2>

            <p className="services-description">
              At SkinCare Spa, we provide our valued customers with intensive skin care and treatment procedures tailored to their unique needs. Our expert team uses advanced techniques and high-quality products to ensure optimal results for every skin type.

              Additionally, we always listen to our customers' needs to enhance service quality and deliver the best therapeutic results.
            </p>

            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-item">
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-text">{service.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="therapist-infor">
        <h2 className="therapist-title">
        Skincare Spa Expert Team
        </h2>
        <div className="doctor-container">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-card-inner">
                <div className="doctor-card-front">
                  <div className="doctor-image">
                    <img src={IMAGES.skinBackground1}  alt={doctor.name} />
                  </div>
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-role">{doctor.role}</p>
                </div>
                <div className="doctor-card-back">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-description">{doctor.description}</p>
                  <button className="doctor-button">Xem thêm</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Content;