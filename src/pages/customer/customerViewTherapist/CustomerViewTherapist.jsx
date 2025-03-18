import { useNavigate } from "react-router-dom";
import IMAGES from '../../../constants/images';
import './CustomerViewTherapist.css';
import { useEffect, useState } from "react";
import axios from "axios";
import BASE from "../../../constants/base";



const CustomerViewTherapist = () => {
    const navigate = useNavigate();
    const [therapists, setTherapists] = useState([]);
    useEffect(() => {
        fetchTherapists();
    }, []);
    const fetchTherapists = async () => {
        try {
            const res = await axios.get(`${BASE.BASE_URL}/get-all-therapists`);
            setTherapists(res.data.data.content);
            console.log(res.data.data.content)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="therapist-infor">
            <h2 className="therapist-title">Skincare Spa Expert Team</h2>
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
                                <p className="therapist-description">{therapist.speciality}</p>
                                <button
                                    className="therapist-button"
                                    onClick={() => navigate(`/customer-view/therapist/${therapist.id}`, 
                                    { state: { therapist: therapist } })}
                                >
                                    Show more
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
