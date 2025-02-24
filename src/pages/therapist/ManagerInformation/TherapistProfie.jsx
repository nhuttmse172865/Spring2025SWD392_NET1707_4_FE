import { useState } from "react";
import "./TherapistProfile.css";

const TherapistProfile = () => {
    
    const [therapist, setTherapist] = useState({
        image: "https://via.placeholder.com/250", 
        name: "Bác sĩ Nguyễn Văn A",
        role: "Chuyên viên trị liệu",
        specialty: "Massage trị liệu",
        languages: "Tiếng Việt, Tiếng Anh",
        certificates: ["Chứng chỉ massage chuyên sâu", "Chứng nhận vật lý trị liệu"],
        experience: ["5 năm kinh nghiệm tại spa A", "3 năm làm việc tại bệnh viện B"],
    });

    return (
        <div className="therapist-profile-container">
            <div className="therapist-profile-content">
                <div className="therapist-profile-image">
                    <img src={therapist.image} alt="therapist" />
                </div>
                <div className="therapist-profile-info">
                    <h2 className="therapist-profile-name">{therapist.name}</h2>
                    <table className="therapist-profile-table">
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
                    <div className="therapist-profile-section">
                        <h3 className="therapist-profile-title">Chứng chỉ</h3>
                        <ul className="therapist-profile-list">
                            {therapist.certificates.map((certificate, index) => (
                                <li key={index}>{certificate}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="therapist-profile-section">
                        <h3 className="therapist-profile-title">Kinh nghiệm</h3>
                        <ul className="therapist-profile-list">
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

export default TherapistProfile;
