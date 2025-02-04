import React, { useRef } from 'react';
import './HomePageFooter.scss';


const HomePageFooter = () => {


  const supportRef = useRef(null);

  

  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Services', path: '/services' },
    { text: 'Pricing', path: '/pricing' },
    { text: 'Contact', path: '/contact' }
  ];

  const workHours = [
    { days: 'Mon - Wed', hours: '09.00 AM - 20.00 PM' },
    { days: 'Thu - Fri', hours: '09.00 AM - 20.00 PM' },
    { days: 'Saturday', hours: '09.00 AM - 18.00 PM' },
    { days: 'Sunday', hours: '09.00 AM - 15.00 PM' }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Quick Links Section */}
        <div className="footer__links">
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <i className="fas fa-chevron-right"></i>
                <a href={link.path}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details Section */}
        <div className="footer__contact">
          <h3>Contact Details</h3>
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> Jl. Raya Kuta No.70, Bali</p>
            <p><i className="fas fa-map-marker-alt"></i> Jl. Kemang Raya No. 3, Jakarta</p>
            <p><i className="fas fa-envelope"></i> support@domain.com</p>
            <p><i className="fas fa-phone"></i> (+021) 251 552</p>
          </div>
        </div>

        {/* Work Hours Section */}
        <div className="footer__hours">
          <h3>Work Hours</h3>
          <div className="hours-info">
            {workHours.map((schedule, index) => (
              <div key={index} className="schedule-row">
                <span className="days">{schedule.days} :</span>
                <span className="hours">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default HomePageFooter;
