import { useLocation, useNavigate } from "react-router-dom";
import "./TherapistDetail.css";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../constants/localStorageName";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE from "../../../constants/base";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

// Social media icons with their corresponding React icons
const socialMediaIcons = [
  { name: "Facebook", icon: <FaFacebookF />, className: "td-fb" },
  { name: "Instagram", icon: <FaInstagram />, className: "td-insta" },
  { name: "Twitter", icon: <FaTwitter />, className: "td-twitter" },
  { name: "WhatsApp", icon: <FaWhatsapp />, className: "td-whatsapp" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, className: "td-linkedin" },
];

// Hardcoded bio data based on speciality
const bioData = {
  "Acne treatment, Facial massage": {
    descriptionPart1:
      "Acne treatment effectively clears the skin by targeting blemishes and reducing inflammation.",
    descriptionPart2:
      "Facial massage promotes relaxation and improves circulation, leaving the skin smooth and rejuvenated.",
  },
  "Anti-aging treatments, Chemical peels": {
    descriptionPart1:
      "Anti-aging treatments reduce wrinkles and fine lines, enhancing a youthful appearance.",
    descriptionPart2:
      "Chemical peels exfoliate the skin, improving texture and tone, though pre-treatment guidance is recommended.",
  },
  "Hydration therapy, Deep cleansing": {
    descriptionPart1:
      "Hydration therapy provides intense moisture, making it ideal for dry or dehydrated skin.",
    descriptionPart2:
      "Deep cleansing removes impurities thoroughly, leaving the skin glowing with a refreshed look.",
  },
  "Laser treatments, Advanced skincare routines": {
    descriptionPart1:
      "Laser treatments improve skin texture and tone, delivering exceptional results for various skin concerns.",
    descriptionPart2:
      "Advanced skincare routines support long-term maintenance, with simpler at-home plans for better manageability.",
  },
};

// Default bio if no speciality match is found
const defaultBio = {
  descriptionPart1:
    "This speciality provides excellent care with clear explanations of treatment options.",
  descriptionPart2:
    "Accessibility between appointments can be improved with better communication channels.",
};

const TherapistDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const therapist = location.state?.therapist;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );

  // Fetch comments and customer names
  useEffect(() => {
    if (therapist?.id) {
      fetchComments();
    }
  }, [therapist]);

  // Decode JWT token
  useEffect(() => {
    if (customer) {
      try {
        const token = customer;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );
        const decodedData = JSON.parse(jsonPayload);
        setAccountId(decodedData.accountId);
      } catch (error) {
        console.error("Invalid JWT Token", error);
      }
    }
  }, [customer]);

  const fetchComments = async () => {
    try {
      // Fetch comments
      const commentsResponse = await axios.get(
        `${BASE.BASE_URL}/feedback/getByThe?therapistId=${therapist.id}&page=0&size=10`,
        {
          headers: { accept: "*/*" },
        }
      );

      const commentsData = commentsResponse.data.data;

      // Fetch customer names for each comment
      const commentsWithNames = await Promise.all(
        commentsData.map(async (comment) => {
          const customerResponse = await axios.get(
            `${BASE.BASE_URL}/info/${comment.customerId}`,
            {
              headers: { accept: "*/*" },
            }
          );
          return {
            id: comment.id,
            text: comment.body,
            user: customerResponse.data.data.name,
          };
        })
      );

      setComments(commentsWithNames);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  if (!therapist) {
    return <p>No therapist.</p>;
  }

  const selectedBio = bioData[therapist.speciality] || defaultBio;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() && accountId && therapist.id) {
      try {
        const payload = {
          content: newComment,
          customerId: accountId,
          therapistId: therapist.id,
        };

        await axios.post(`${BASE.BASE_URL}/feedback/create`, payload, {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        });

        // Refresh comments after successful submission
        await fetchComments();
        setNewComment("");
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    }
  };

  return (
    <div className="td-container">
      {/* Header Section */}
      <div className="td-header">
        <div className="td-image-wrapper">
          <img src={therapist.images?.[0]?.url} alt="therapist" />
        </div>
        <div className="td-header-info">
          <div className="td-info-main">
            <h2 className="td-name">Dr. {therapist.account.name}</h2>
            <div className="td-contact">
              <p>
                <span className="td-icon td-location-icon">
                  <FaMapMarkerAlt />
                </span>
                D1, Long Thanh My, Thu Duc, Ho Chi Minh
              </p>
              <p>
                <span className="td-icon td-email-icon">
                  <FaEnvelope />
                </span>
                {therapist.account.email}
              </p>
              <p>
                <span className="td-icon td-phone-icon">
                  <FaPhone />
                </span>
                {therapist.account.phone}
              </p>
            </div>
          </div>
          <div className="td-social-media">
            <h4 className="td-social-title">Social Media</h4>
            <div className="td-social-icons">
              {socialMediaIcons.map((social, index) => (
                <a
                  key={index}
                  href={`https://${social.name.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`td-social-icon ${social.className}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="td-content">
        <div className="td-bio">
          <h3>Description</h3>
          <ul>
            <li>{selectedBio.descriptionPart1}</li>
            <li>{selectedBio.descriptionPart2}</li>
          </ul>
        </div>
        <div className="td-experience">
          <h3>Experience & Credentials</h3>
          <p>
            <strong>Experience:</strong> {therapist.experience} years of
            experience
          </p>
          <p>
            <strong>Certificate:</strong> {therapist.certificate}
          </p>
          <p>
            <strong>Speciality:</strong> {therapist.speciality}
          </p>
        </div>
      </div>

      {/* Comment Section */}
      <div className="td-comments-section">
        {/* Add Comment Input */}
        <form className="td-comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            className="td-comment-input"
            placeholder="Add comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="td-comment-actions">
            <div className="td-comment-icons">
              <button type="button" className="td-icon-btn">
                <span role="img" aria-label="link">
                  🔗
                </span>
              </button>
              <button type="button" className="td-icon-btn">
                <span role="img" aria-label="image">
                  🖼️
                </span>
              </button>
              <button type="button" className="td-icon-btn">
                <span role="img" aria-label="emoji">
                  😊
                </span>
              </button>
              <button type="button" className="td-icon-btn">
                <span role="img" aria-label="at">
                  @
                </span>
              </button>
            </div>
            <button type="submit" className="td-submit-btn">
              Submit
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="td-comments-header">
          <h3>
            Comments <span className="td-comment-count">{comments.length}</span>
          </h3>
        </div>
        <div className="td-comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="td-comment">
              <div className="td-comment-user">
                <div>
                  <p className="td-comment-user-name">{comment.user}</p>
                </div>
              </div>
              <p className="td-comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistDetail;
