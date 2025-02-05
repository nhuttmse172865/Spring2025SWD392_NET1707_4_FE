

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import './HomePageForm.scss';
import FPT from '/AssetsHomePage/FPT.jpg';
import SkinCare from '/AssetsHomePage/SkinCare.png';


const HomePageForm = () => {

  const aboutUsRef = useRef(null);
  const therapistRef = useRef(null);
  const supportRef = useRef(null);

  const scrollToSection = (section) => {
    switch (section) {
      case 'aboutUs':
        aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'therapist':
        therapistRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'support':
        supportRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const doctors = [
    {
      id: 1,
      name: 'Ths.BS Phạm Minh Đoàn',
      image: '/AssetsHomePage/FPT.jpg',
      description: 'Chuyên gia với hơn 10 năm kinh nghiệm trong lĩnh vực da liễu thẩm mỹ. Tốt nghiệp Thạc sĩ chuyên ngành Da liễu.',
      specialties: ['Da liễu thẩm mỹ', 'Điều trị mụn', 'Trẻ hóa da']
    },
    {
      id: 2,
      name: 'BS CKI Lê Thương Thùy Vi',
      image: '/AssetsHomePage/FPT.jpg',
      description: 'Bác sĩ chuyên khoa I với chuyên môn sâu về điều trị các vấn đề về da. Nhiều năm kinh nghiệm trong lĩnh vực thẩm mỹ.',
      specialties: ['Điều trị nám', 'Trẻ hóa da', 'Căng chỉ']
    },
    {
      id: 3,
      name: 'BS CKI Trần Thị Huyền Trang',
      image: '/AssetsHomePage/FPT.jpg',
      description: 'Chuyên gia về điều trị các vấn đề về da chuyên sâu. Có nhiều năm kinh nghiệm trong lĩnh vực thẩm mỹ không phẫu thuật.',
      specialties: ['Thẩm mỹ không phẫu thuật', 'Điều trị sẹo', 'Căng chỉ']
    },
    {
      id: 4,
      name: 'BS CKI Hoàng Thị Thúy Trang',
      image: '/AssetsHomePage/FPT.jpg',
      description: 'Bác sĩ chuyên khoa với nhiều năm kinh nghiệm trong điều trị các vấn đề về da. Được đào tạo chuyên sâu về thẩm mỹ.',
      specialties: ['Điều trị mụn', 'Trẻ hóa da', 'Thẩm mỹ không phẫu thuật']
    }
  ];

  const standards = [
    {
      id: 1,
      icon: '🏥',
      title: 'Chuyên Môn Vững Vàng',
      description: 'Tất cả bác sĩ SKIN đều tốt nghiệp Đại học Y khoa và có chứng chỉ hành nghề do bộ Y tế cấp, nên tầng chuyên môn vững chắc, am hiểu sâu hiện thực.'
    },
    {
      id: 2,
      icon: '⚕️',
      title: 'Nhiều Năm Kinh Nghiệm',
      description: 'Các Bác sĩ SKIN có kinh nghiệm nhiều năm trong việc chẩn đoán và lựa chọn cách hữu hiệu.'
    },
    {
      id: 3,
      icon: '👍',
      title: 'Tư Vấn Trung Thực, Tận Tâm',
      description: 'Bác sĩ SKIN luôn lắng nghe và tận tâm với khách hàng, cam kết tư vấn trung thực.'
    },
    {
      id: 4,
      icon: '📈',
      title: 'Luôn Cập Nhật Và Nâng Cao Kiến Thức Điều Trị',
      description: 'Bác sĩ SKIN luôn cập nhật các phương pháp điều trị tiên tiến.'
    }
  ];

  const galleryData = [
    {
      id: 1,
      title: 'Tiger Devil',
      description: 'Tiger Devil is a legendary creature that arouses both fascination and fear. Known for its imposing appearance and unpredictable behavior, this beast is often described as a tiger with demonic features.',
      mainImage: '/AssetsHomePage/FPT.jpg',
      thumbnail: '/AssetsHomePage/FPT.jpg',
    },
    {
      id: 2,
      title: 'Dragon Beast',
      description: 'A mythical creature combining the power of dragons with bestial fury. Its scales gleam with an otherworldly light, striking terror into the hearts of those who dare face it.',
      mainImage: '/AssetsHomePage/FPT.jpg',
      thumbnail: '/AssetsHomePage/FPT.jpg',
    },
    {
      id: 3,
      title: 'Phoenix Warrior',
      description: 'Rising from the ashes, the Phoenix Warrior embodies rebirth and eternal power. Its fiery form illuminates the darkness, bringing hope to allies and destruction to enemies.',
      mainImage: '/AssetsHomePage/FPT.jpg',
      thumbnail: '/AssetsHomePage/FPT.jpg',
    }
  ];

  

  const [activeImage, setActiveImage] = useState(galleryData[0]);

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  return (
    <div className="home-page-container">
      <div className="home-page-body">
        {/* About Us Section with Scroll Animation */}
        <motion.section
          ref={aboutUsRef}
          id="aboutUs"
          className="section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }} // Added margin for better visibility when near
          transition={{ duration: 1.0 }}
        >
          <div className="gallery-container">
            <div className="gallery-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="content-wrapper"
                >
                  <h1 className="title">{activeImage.title}</h1>
                  <p className="description">{activeImage.description}</p>
                  <button className="view-more-btn">View More</button>
                </motion.div>
              </AnimatePresence>
              <div className="main-image-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage.id}
                    src={activeImage.mainImage}
                    alt={activeImage.title}
                    className="main-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
              {/* <div
                className="main-image-wrapper"
                style={{ backgroundImage: `url(${activeImage.mainImage})` }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="main-image-overlay"
                  ></motion.div>
                </AnimatePresence>
              </div> */}

            </div>
            <div className="thumbnails-wrapper">
              {galleryData.map((image) => (
                <motion.div
                  key={image.id}
                  className={`thumbnail ${activeImage.id === image.id ? "active" : ""}`}
                  onClick={() => handleImageClick(image)}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={image.thumbnail} alt={image.title} className="thumb-image" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Therapist Section with Scroll Animation */}
        <motion.section
          ref={therapistRef}
          id="therapist"
          className="section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }} // Added margin for better visibility when near
          transition={{ duration: 1.0 }}
        >
          <div className="doctor-team">
            <h1 className="doctor-team__title">Tiêu Chuẩn Trở Thành Bác Sĩ Tại FPT Skin Care</h1>
            <div className="standards">
              {standards.map((standard) => (
                <div key={standard.id} className="standard-card">
                  <span className="standard-card__icon">{standard.icon}</span>
                  <h3 className="standard-card__title">{standard.title}</h3>
                  <p className="standard-card__description">{standard.description}</p>
                </div>
              ))}
            </div>
            <h2 className="doctor-team__subtitle">Đội Ngũ Bác Sĩ</h2>
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-card__image-container">
                    <img src={doctor.image} alt={doctor.name} className="doctor-card__image" />
                    <div className="doctor-card__modal">
                      <div className="doctor-card__modal-content">
                        <p className="doctor-card__description">{doctor.description}</p>
                        <button className="doctor-card__view-more">Xem thêm</button>
                      </div>
                    </div>
                  </div>
                  <h3 className="doctor-card__name">{doctor.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePageForm;
