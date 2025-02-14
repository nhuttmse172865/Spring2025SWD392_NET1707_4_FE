import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <main className="contact-main">
        <div className="contact-card">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="contact-heading">Get In Touch With Us Now!</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-phone-alt contact-icon"></i>
                  <div>
                    <h3 className="contact-title">Phone Number</h3>
                    <p>+91 80004 36640</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope contact-icon"></i>
                  <div>
                    <h3 className="contact-title">Email</h3>
                    <p>namnpse173557@fpt.edu.vn</p>
                    <p>sales@expertwebdesigning.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt contact-icon"></i>
                  <div>
                    <h3 className="contact-title">Location</h3>
                    <p>
                      Saigon Hitech Park, Phường Tân Phú, Thủ Đức, Hồ Chí Minh
                    </p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock contact-icon"></i>
                  <div>
                    <h3 className="contact-title">Working Hours</h3>
                    <p>Monday To Saturday</p>
                    <p>07:00 AM To 17:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-section">
              <h2 className="contact-heading">Contact Us</h2>
              <div className="contact-form">
                <form>
                  <div className="contact-row">
                    <div>
                      <label htmlFor="first-name">
                        First Name <span className="required">*</span>
                      </label>
                      <input type="text" id="first-name" />
                    </div>
                    <div>
                      <label htmlFor="last-name">Last Name</label>
                      <input type="text" id="last-name" />
                    </div>
                  </div>
                  <div className="contact-row">
                    <div>
                      <label htmlFor="mobile-no">
                        Mobile No <span className="required">*</span>
                      </label>
                      <input type="text" id="mobile-no" />
                    </div>
                    <div>
                      <label htmlFor="email-id">
                        Email<span className="required">*</span>
                      </label>
                      <input type="email" id="email-id" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="4"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-submit">
          <button type="submit">
            Submit <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Contact;
