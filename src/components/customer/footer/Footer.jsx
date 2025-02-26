import React, { useRef } from "react";
import IMAGES from "../../../constants/images";
import "./Footer.css";

const Footer = () => {
  const supportRef = useRef(null);

  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#" className="social-link facebook">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" className="social-link youtube">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a href="#" className="social-link twitter">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="#" className="social-link pinterest">
          <i className="fa-brands fa-pinterest"></i>
        </a>
        <a href="#" className="social-link instagram">
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>

      <div className="footer-content">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>
            Issued Date: 09/02/2025 - Issued By: Ho Chi Minh City Department of
            Planning and Investment
          </p>
          <p className="address">
            Address: 70 Lu Gia, Ward 15, District 11, Ho Chi Minh City
          </p>
          <p className="phone">Phone: 1900 6750</p>
          <p className="email">Email: support@sapo.vn</p>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h3>Guides</h3>
            <ul>
              <li>
                <a href="#">Shopping Guide</a>
              </li>
              <li>
                <a href="#">Payment Guide</a>
              </li>
              <li>
                <a href="#">Delivery Guide</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          <div className="link-column">
            <h3>Policies</h3>
            <ul>
              <li>
                <a href="#">Membership Policy</a>
              </li>
              <li>
                <a href="#">Payment Policy</a>
              </li>
              <li>
                <a href="#">Shipping and Delivery Policy</a>
              </li>
              <li>
                <a href="#">Personal Information Privacy</a>
              </li>
            </ul>
          </div>

          <div className="newsletter">
            <h3>Subscribe for Promotions</h3>
            <div className="subscribe-form">
              <input
                type="email"
                placeholder="Enter your email to receive promotions"
              />
              <button type="submit">Subscribe</button>
            </div>

            <div className="payment-section">
              <h3>Payment Methods</h3>
              <div className="payment-methods">
                <img src={IMAGES.visa} alt="Visa" />
                <img src={IMAGES.mastercard} alt="Mastercard" />
                <img src={IMAGES.otherCard} alt="Other payment methods" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
