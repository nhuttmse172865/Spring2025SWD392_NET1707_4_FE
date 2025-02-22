import React from "react";
import "./ProfileModal.css";

function ProfileModal() {
  return (
    <div className="container">
      <div className="profile-card">
        <img
          src="https://placehold.co/100x100"
          alt="Profile picture of a smiling woman with blonde hair"
          className="profile-img"
        />
        <div className="profile-info">
          <div className="profile-header">
            <h2>Helen Valdez</h2>
            <span className="badge">Therapist</span>
          </div>
          <div className="profile-details">
            <p>
              <span className="label">Experiences:</span> Expert with more than
              5 years of experience in the field of massage therapy.
            </p>
            <p>
              <span className="label">Email:</span> helen.valdez@gmail.com
            </p>
            <p>
              <span className="label">Phone:</span> 654-3210
            </p>
            <p>
              <span className="label">Company:</span> Skincare Spa
            </p>
          </div>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
