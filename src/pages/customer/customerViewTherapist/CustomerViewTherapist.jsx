import { useNavigate } from "react-router-dom";
import IMAGES from '../../../constants/images';
import './CustomerViewTherapist.css';

const therapists = [
    {
        id: 1,
        name: 'Emely Jonson',
        role: 'Chuyên viên massage',
        specialty: 'Massage trị liệu',
        languages: 'Tiếng Việt, Tiếng Anh',
        certificates: [
            'Tốt nghiệp khoa Y Trường Đại học Cần Thơ niên khóa 1986-1992.',
            'Hoàn tất khóa học siêu âm tổng quát do Trung tâm đào tạo Y khoa Medic tổ chức, 1993.',
            'Tốt nghiệp cao học tại trường Đại học Y Dược TP HCM niên khóa 1998-2001.',
            'Tham gia khóa học tại Stanford Medical Center, 2008.',
        ],
        experience: [
            '1993 - 2002: Bệnh viện Đa khoa Hậu Nghĩa, Long An.',
            '2002 - 2005: Bệnh viện Quốc tế Thận và lọc thận.',
            '2005 đến nay: Phòng khám Quốc tế Victoria Healthcare.',
        ],
        description: 'Chuyên gia với hơn 5 năm kinh nghiệm trong lĩnh vực massage trị liệu.',
    },
    {
        id: 2,
        name: 'Lola Jonson',
        role: 'Chuyên viên chăm sóc da',
        specialty: 'Chăm sóc da chuyên sâu',
        languages: 'Tiếng Việt, Tiếng Anh',
        certificates: [
            'Tốt nghiệp khoa Y Trường Đại học Cần Thơ niên khóa 1986-1992.',
            'Hoàn tất khóa học siêu âm tổng quát do Trung tâm đào tạo Y khoa Medic tổ chức, 1993.',
            'Tốt nghiệp cao học tại trường Đại học Y Dược TP HCM niên khóa 1998-2001.',
            'Tham gia khóa học tại Stanford Medical Center, 2008.',
        ],
        experience: [
            '1993 - 2002: Bệnh viện Đa khoa Hậu Nghĩa, Long An.',
            '2002 - 2005: Bệnh viện Quốc tế Thận và lọc thận.',
            '2005 đến nay: Phòng khám Quốc tế Victoria Healthcare.',
        ],
        description: 'Chuyên gia thẩm mỹ với kinh nghiệm trong việc điều trị các vấn đề về da.',
    },
    {
        id: 3,
        name: 'Rose Marian',
        role: 'Chuyên viên chăm sóc da',
        specialty: 'Trị liệu da liễu',
        languages: 'Tiếng Việt, Tiếng Anh',
        certificates: [
            'Tốt nghiệp khoa Y Trường Đại học Cần Thơ niên khóa 1986-1992.',
            'Hoàn tất khóa học siêu âm tổng quát do Trung tâm đào tạo Y khoa Medic tổ chức, 1993.',
            'Tốt nghiệp cao học tại trường Đại học Y Dược TP HCM niên khóa 1998-2001.',
            'Tham gia khóa học tại Stanford Medical Center, 2008.',
        ],
        experience: [
            '1993 - 2002: Bệnh viện Đa khoa Hậu Nghĩa, Long An.',
            '2002 - 2005: Bệnh viện Quốc tế Thận và lọc thận.',
            '2005 đến nay: Phòng khám Quốc tế Victoria Healthcare.',
        ],
        description: 'Chuyên gia với chứng chỉ quốc tế về thẩm mỹ và chăm sóc da.',
    }
];

const CustomerViewTherapist = () => {
    const navigate = useNavigate();

    return (
        <section className="therapist-infor">
            <h2 className="therapist-title">Skincare Spa Expert Team</h2>
            <div className="therapist-container">
                {therapists.map((therapist) => (
                    <div key={therapist.id} className="therapist-card">
                        <div className="therapist-card-inner">
                            <div className="therapist-card-front">
                                <div className="therapist-image">
                                    <img src={IMAGES.skinBackground1} alt={therapist.name} />
                                </div>
                                <h3 className="therapist-name">{therapist.name}</h3>
                                <p className="therapist-role">{therapist.role}</p>
                            </div>
                            <div className="therapist-card-back">
                                <h3 className="therapist-name">{therapist.name}</h3>
                                <p className="therapist-description">{therapist.description}</p>
                                <button
                                    className="therapist-button"
                                    onClick={() => navigate(`/customer-view/therapist/${therapist.id}`, { state: therapist })}
                                >
                                    Show moree
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CustomerViewTherapist;
