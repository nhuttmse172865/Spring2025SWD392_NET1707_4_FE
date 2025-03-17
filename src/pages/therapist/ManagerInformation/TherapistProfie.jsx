import { useEffect, useState } from "react";
import "./TherapistProfile.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BASE from "../../../constants/base";
import { Modal, Input, Button, Upload, message, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const TherapistProfile = () => {
    
    const [therapist, setTherapist] = useState({
       
    });
    const [imageFile, setImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        accountId: "",
        password: "",
        name: "",
        phone: "",
        experience: "",
        specialty: "",
        certificate: "",
    });

 useEffect(() => {
    featchTherapist();
 }, []);
 const featchTherapist = async () => {
const token = localStorage.getItem('customer_information');
const decode = jwtDecode(token);
const accountId = decode.accountId; 
try {
    const res = await axios.get(`${BASE.BASE_URL}/get-therapist-by-account-id/${accountId}`);
    setTherapist(res.data.data);
    setFormData({
        accountId: res.data.data.account.id,
        password: "", 
        name: res.data.data.account.name,
        phone: res.data.data.account.phone,
        experience: res.data.data.experience,
        specialty: res.data.data.speciality,
        certificate: res.data.data.certificate,
    });
    console.log(res.data.data)
} catch (error) {
    console.log(error);
}
};
const handleInputChange = (e) => {
const {value, name} = e.target;
setFormData({...formData, [name]: value});
}
const handleFileChange = (info) => {
    if(info.file){
        setImageFile(info.file);
    }
};
const handleSubmit = async (e) => {
e.preventDefault();
console.log("Dữ liệu form trước khi gửi:", formData);
    console.log("File ảnh:", imageFile);
const data = new FormData();
data.append("request",JSON.stringify(formData));
if (imageFile) {
    data.append("images", imageFile);
}
try {
    const res = await axios.put(`${BASE.BASE_URL}/update-therapist-info`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    notification.success({message: "Update profile successful!"});
    setIsModalOpen(false);
    featchTherapist();
} catch (error) {
    console.log(error)
}
}
    return (
        <div className="therapist-profile-container">
            <div className="therapist-profile-content">
                <div className="therapist-profile-image">
                <img src={therapist?.images?.[0]?.url || "default-image.jpg"} alt="therapist" />
                <button className="btn-updateprofile" onClick={() => setIsModalOpen(true)}>Update profile</button>
                </div>
                <div className="therapist-profile-info">
                    <h2 className="therapist-profile-name">{therapist?.account?.name}</h2>
                    <table className="therapist-profile-table">
                        <tbody>
                           
                            <tr>
                                <td><strong>speciality</strong></td>
                                <td>{therapist?.speciality}</td>
                            </tr>
                          
                        </tbody>
                    </table>
                    <div className="therapist-profile-section">
                        <h3 className="therapist-profile-title">Chứng chỉ</h3>
                        <ul className="therapist-profile-list">
                            {therapist?.certificate}
                           
                        </ul>
                    </div>
                    <div className="therapist-profile-section">
                        <h3 className="therapist-profile-title">Kinh nghiệm</h3>
                        <ul className="therapist-profile-list">
                            {therapist?.experience}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal
                title="Cập nhật hồ sơ"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancle
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Save
                    </Button>,
                ]}
            >
                <label>Name:</label>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
                <label>Password:</label>
                <Input name="password" value={formData.password} onChange={handleInputChange} />
                <label>Phone:</label>
                <Input name="phone" value={formData.phone} onChange={handleInputChange} />

                <label>Experience:</label>
                <Input type="number" name="experience" value={formData.experience} onChange={handleInputChange} />

                <label>Specialty:</label>
                <Input name="specialty" value={formData.specialty} onChange={handleInputChange} />

                <label>Certificate:</label>
                <Input name="certificate" value={formData.certificate} onChange={handleInputChange} />

                <label>Image:</label>
                <Upload beforeUpload={() => false}   onChange={handleFileChange} maxCount={1}  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Modal>
        </div>
    );
};

export default TherapistProfile;
