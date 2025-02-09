
import React from 'react';
import './Content.css';
import IMAGES from "../../../constants/images";

const Content = () => {

  const services = [
    {
      icon: "👩",
      title: "Caring for Your Skin"
    },
    {
      icon: "💆‍♀️",
      title: " Intensive Treatment"
    },
    {
      icon: "🧴",
      title: " Specialized Treatment Products"
    },
    {
      icon: "🔍",
      title: "Free Skin Examination and Consultation"
    },
    {
      icon: "🏥",
      title: " Modern Equipment"
    },
    {
      icon: "👩‍⚕️",
      title: " Experienced Technicians"
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
              The quality or aggregate of qualities in a person or thing that gives pleasure to the senses or pleasurably exalts the mind or spirit: loveliness. A woman of great physical beauty exploring the natural beauty of the island, where the golden rays of the sun gently kiss the shimmering waves of the ocean. The scent of blooming flowers fills the air, creating an atmosphere of serenity and charm. Beauty is not just about appearances; it is the essence of confidence, kindness, and grace. It radiates from within, shining through every smile, every act of compassion, and every expression of joy. True beauty lies in embracing oneself, appreciating the wonders of nature, and finding harmony in the simple yet profound moments of life.
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
              At SkinCare Spa, we provide our valued customers with intensive skin care and treatment procedures.
              Additionally, we always listen to our customers' needs, no matter how small, to enhance service quality and deliver the best therapeutic results.
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

    </div>
  );
};

export default Content;