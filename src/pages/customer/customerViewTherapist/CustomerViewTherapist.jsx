

import { useNavigate } from "react-router-dom";
import IMAGES from "../../../constants/images";
import "./CustomerViewTherapist.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE from "../../../constants/base";

const CustomerViewTherapist = () => {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(
        "Fetching therapists from:",
        `${BASE.BASE_URL}/get-all-therapists`
      );
      const res = await axios.get(`${BASE.BASE_URL}/get-all-therapists`);
      console.log("Full API Response:", res);
      console.log("Therapists Data:", res.data.data.content);

      let therapistsData = [];
      if (res.data.data && res.data.data.content) {
        therapistsData = res.data.data.content;
      } else if (res.data.content) {
        therapistsData = res.data.content;
      } else if (Array.isArray(res.data)) {
        therapistsData = res.data;
      } else {
        console.warn("Unexpected API response structure:", res.data);
      }

      console.log("Processed Therapists Data:", therapistsData);
      setTherapists(therapistsData || []);
      if (therapistsData.length === 0) {
        console.warn("No therapists data received from API.");
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
      console.error("Error details:", error.response);
      setError("Failed to fetch therapists. Please try again later.");
      setTherapists([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skincare-homepage">
      {/* Header Section */}
      <section className="skincare-header-section">
        <div className="skincare-header-content">
          <h1>Connect with expert skincare therapists online</h1>
          <p>
            Transform your skin with personalized care from our certified
            skincare therapists. Whether you're struggling with acne, seeking to
            reduce signs of aging, or aiming for a radiant complexion, our
            experts provide tailored consultations and treatments from the
            comfort of your home.
          </p>
          <div className="skincare-header-buttons">
            <button className="skincare-cta-button">View a session</button>
          </div>
          <p className="skincare-experience">
            10+ years of trusted skincare therapy online
          </p>
        </div>
        <div className="skincare-header-image">
          <img
            src={IMAGES.skincare || "path-to-skincare-therapists-image.jpg"}
            alt="Skincare Therapists"
          />
        </div>
      </section>

      {/* Specialties Section */}
      <section className="skincare-specialties-section">
        <div className="skincare-specialty-card">
          <h3>Acne Therapy</h3>
          <p>
            Targeted treatments by our therapists to eliminate acne, reduce
            inflammation, and prevent scarring for clearer skin.
          </p>
          <a href="#" className="skincare-learn-more">
            Learn more
          </a>
        </div>
        <div className="skincare-specialty-card">
          <h3>Anti-Aging </h3>
          <p>
            Expert-led solutions to minimize wrinkles, fine lines, and sagging
            skin, restoring a youthful glow with proven techniques.
          </p>
          <a href="#" className="skincare-learn-more">
            Learn more
          </a>
        </div>
        <div className="skincare-specialty-card">
          <h3>Hydration Therapy</h3>
          <p>
            Specialized care to hydrate and revitalize dry, dull skin, leaving
            it plump, soft, and radiant with therapist expertise.
          </p>
          <a href="#" className="skincare-learn-more">
            Learn more
          </a>
        </div>
        <div className="skincare-specialty-card">
          <h3>Skin Brightening</h3>
          <p>
            Therapist-designed treatments to fade dark spots and even out skin
            tone for a luminous, flawless complexion.
          </p>
          <a href="#" className="skincare-learn-more">
            Learn more
          </a>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="skincare-consultation-section">
        <div className="skincare-consultation-image">
          <img
            src={IMAGES.therapist || "path-to-therapist-consult-image.jpg"}
            alt="Skincare Therapist"
          />
        </div>
        <div className="skincare-consultation-content">
          <h2>Custom Care from Skincare Therapists</h2>
          <p>
            Our skilled skincare therapists bring extensive knowledge and
            expertise to design personalized routines that effectively address
            your unique skin concerns. Each session is tailored to your specific
            needs, ensuring that you receive the most suitable treatments for
            your skin type, condition, and long-term goals.
          </p>
          <p>
            Discover the transformative power of expert skincare. Book a
            consultation today and take the first step toward achieving your
            best skin yet!
          </p>
          <button className="skincare-cta-button">View a Session</button>
        </div>
      </section>

      {/* Our Therapists Section */}
      <section className="therapist-infor">
        <h2 className="therapist-title">Our Skincare Therapists</h2>
        {loading ? (
          <p>Loading therapists...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : therapists.length > 0 ? (
          <div className="therapist-container">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="therapist-card">
                <div className="therapist-card-inner">
                  <div className="therapist-card-front">
                    <div className="therapist-image">
                      <img src={therapist.images?.[0]?.url} alt="therapist" />
                    </div>
                    <h3 className="therapist-name">{therapist.account.name}</h3>
                    <p className="therapist-role">{therapist.role}</p>
                  </div>
                  <div className="therapist-card-back">
                    <h3 className="therapist-name">{therapist.account.name}</h3>
                    <p className="therapist-description">
                      {therapist.speciality}
                    </p>
                    <button
                      className="therapist-button"
                      onClick={() =>
                        navigate(`/customer-view/therapist/${therapist.id}`, {
                          state: { therapist: therapist },
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No skincare therapists available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default CustomerViewTherapist;
