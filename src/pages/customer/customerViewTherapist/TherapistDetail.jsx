import { useLocation, useNavigate } from "react-router-dom";
import "./TherapistDetail.css";

const TherapistDetail = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const therapist = location.state?.therapist;
    if (!therapist) {
        return <p>No therapist.</p>;
    }
    return (
    <div className="therapist-detail-container">
        <div className="therapist-detail-content">
            <div className="therapist-image">
            
                <img src={therapist.images?.[0]?.url} alt="therapist" />
            </div>
            <div className="therapist-detail-info">
                <h2 className="therapist-detail-name">Name:   {therapist.account.name}</h2>
                
                        <div className="therapist-detail-section">
                    <h3 className="therapist-section-title">
                    Speciality 
                    </h3>
                    <p className="therapist-section-list">
                        {therapist.speciality }
                    </p>
                </div>
                <div className="therapist-detail-section">
                    <h3 className="therapist-section-title">
                    Certificate 
                    </h3>
                    <span className="therapist-section-list">
                        {therapist.certificate }
                    </span>
                </div>
                <div className="therapist-detail-section">
                        <h3 className="therapist-section-title">Experience</h3>
                        <p className="therapist-section-list">
                            {therapist.experience} year
                        </p>
                    </div>
            </div>
        </div>
    </div>
    );
};

export default TherapistDetail;
