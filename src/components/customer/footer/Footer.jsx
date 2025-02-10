import React, { useRef } from 'react';
import IMAGES from "../../../constants/images";
import './Footer.css';




const Footer = () => {


    const supportRef = useRef(null);

    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="#" className="social-link facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="social-link youtube"><i className="fa-brands fa-youtube"></i></a>
                <a href="#" className="social-link twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="social-link pinterest"><i className="fa-brands fa-pinterest"></i></a>
                <a href="#" className="social-link instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>


            <div className="footer-content">
                <div className="contact-info">
                    <h3>Thông tin liên hệ</h3>
                    <p>Ngày cấp: 09/02/2025 - Nơi cấp: Sở kế hoạch và đầu tư TPHCM</p>
                    <p className="address">Địa chỉ: 70 Lữ Gia, Phường 15, Quận 11, TP.HCM</p>
                    <p className="phone">Điện thoại: 1900 6750</p>
                    <p className="email">Email: support@sapo.vn</p>
                </div>

                <div className="footer-links">
                    <div className="link-column">
                        <h3>Hướng dẫn</h3>
                        <ul>
                            <li><a href="#">Hướng dẫn mua hàng</a></li>
                            <li><a href="#">Hướng dẫn thanh toán</a></li>
                            <li><a href="#">Hướng dẫn giao nhận</a></li>
                            <li><a href="#">Điều khoản dịch vụ</a></li>
                            <li><a href="#">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>

                    <div className="link-column">
                        <h3>Chính sách</h3>
                        <ul>
                            <li><a href="#">Chính sách thành viên</a></li>
                            <li><a href="#">Chính sách thanh toán</a></li>
                            <li><a href="#">Chính sách vận chuyển và giao nhận</a></li>
                            <li><a href="#">Bảo mật thông tin cá nhân</a></li>
                        </ul>
                    </div>

                    <div className="newsletter">
                        <h3>Nhận tin khuyến mãi</h3>
                        <div className="subscribe-form">
                            <input type="email" placeholder="Nhập email nhận tin khuyến mãi" />
                            <button type="submit">Đăng Ký</button>
                        </div>

                        <div className="payment-section">
                            <h3>Thanh toán</h3>
                            <div className="payment-methods">
                                <img src={IMAGES.visa} alt="Visa" />
                                <img src={IMAGES.mastercard} alt="Mastercard" />
                                <img src={IMAGES.otherCard} alt="Other payment methods" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
