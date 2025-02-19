import { useLocation, useNavigate } from "react-router-dom";
import "./TherapistDetail.css";

const TherapistDetail = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const therapist = location.state;
    return (
    <div className="therapist-detail-container">
        <div className="therapist-detail-content">
            <div className="therapist-image">
                <img src={therapist.image} alt="therapist" />
            </div>
            <div className="therapist-detail-info">
                <h2 className="therapist-detail-name">{therapist.name}</h2>
                <table className="therapist-detail-table">
                    <tbody>
                        <tr>
                        <td><strong>Role</strong></td>
                        <td>{therapist.role}</td>
                        </tr>
                        <tr>
                        <td><strong>Chuyên khoa</strong></td>
                        <td>{therapist.specialty}</td>
                        </tr>
                        <tr>
                                <td><strong>Ngoại ngữ</strong></td>
                                <td>{therapist.languages}</td>
                            </tr>
                       
                        </tbody>
                </table>
                <div className="therapist-detail-section">
                    <h3 className="therapist-section-title">
                        Chứng chỉ
                    </h3>
                    <ul className="therapist-section-list">
                        {therapist.certificates.map((certificate, index) => (
                            <li key={index}>{certificate}</li>
                        ))}
                    </ul>
                </div>
                <div className="therapist-detail-section">
                        <h3 className="therapist-section-title">Kinh nghiệm</h3>
                        <ul className="therapist-section-list">
                            {therapist.experience.map((exp, index) => (
                                <li key={index}>{exp}</li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
    </div>
    );
};

export default TherapistDetail;
