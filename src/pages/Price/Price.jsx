import React, { useState } from 'react';
import './Price.scss' // Make sure to import the CSS file


const Price = () => {

    const treatments = [
        {
          name: 'Khám mụn chuẩn Y khoa',
          regularPrice: '100.000',
          isHighlighted: true
        },
        {
          name: 'Chiếu ánh sáng sinh học',
          regularPrice: '100.000',
        },
        {
          name: 'Mặt nạ điều trị mụn và kiểm soát nhờn',
          regularPrice: '100.000',
          insurancePrice: '100.000'
        },
        {
          name: 'Lấy nhân mụn Y khoa',
          regularPrice: '380.000',
          isHighlighted: true
        },
        {
          name: 'Chiếu ánh sáng và điện di đưa dưỡng chất (điều trị mụn và kiểm soát nhờn)',
          regularPrice: '390.000',
        },
        {
          name: 'Peel điều trị mụn',
          regularPrice: '957.000',
        }
      ];
    return (
        <div className="pricing-table">
          <h1 className="pricing-table__title">Bảng Giá Chi Tiết</h1>

          <div className="pricing-table__container">
            <h2 className="pricing-table__subtitle">
              Bảng Giá Trị Mụn Cơ Bản
            </h2>
            <p className="pricing-table__description">
              Dành cho da mụn, ít gặp các vấn đề đi kèm như sẹo rỗ, tăng sắc tố (thâm, sạm...)
            </p>

            <div className="pricing-table__content">
              <div className="pricing-table__header">
                <div className="pricing-table__treatment">Điều Trị Mụn Cơ Bản</div>
                <div className="pricing-table__face-area">
                  <div className="pricing-table__icon">
                    <span>👤</span>
                  </div>
                  Vùng Da Mặt
                </div>
              </div>
              {treatments.map((treatment, index) => (   
                <div
                  key={index}
                  className={`pricing-table__row ${treatment.isHighlighted ? 'pricing-table__row--highlighted' : ''}`}
                >
                  <div className="pricing-table__treatment-name">
                    {treatment.name}
                  </div>
                  <div className="pricing-table__price-regular">
                    {treatment.regularPrice} VND
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
};

export default Price;