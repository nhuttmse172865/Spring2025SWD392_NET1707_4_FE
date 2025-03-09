import React, { useEffect, useState } from 'react';
import { Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import './Itinerary.css';
import axios from 'axios';
import BASE from '../../../constants/base';
const { Option } = Select;

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour++) {
      slots.push(`${hour}:00 - ${hour + 1}:00`);
    }
    return slots;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setTimeSlots(generateTimeSlots());
    } else {
      setTimeSlots([]);
    }
  };
  useEffect(() => {
    featchServices();
  }, []);
  const featchServices = async () => {
    try {
      const res = await axios.get(`${BASE.BASE_URL}/service/getAllServicePaging`);
      console.log(res.data.data);
      setServices(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='create-booking-therapist'>
      <div className="header-booking-therapist">
        <div className="select-service-therapist">
          <Select
            className='select-service-therapist'
            showSearch
            style={{ width: 200 }}
            placeholder="Select a service"
            optionFilterProp="children"
            onChange={(value) => setSelectedService(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
           
          
           {services.map((service) => (
           <Option key={service.id}>
              {service.name}
           </Option>

            ))
          }
          </Select>
        </div>
        <div className="select-date">
          <DatePicker onChange={handleDateChange}  className='datepicker-itinerary'/>
        </div>
      </div>

      {selectedDate && (
        <div className="time-slots">
          <h3>Available Slots for {dayjs(selectedDate).format('YYYY-MM-DD')}</h3>
          <ul>
            {timeSlots.map((slot, index) => (
              <li key={index} className="time-slot-item">
                {slot}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="btn-container">
  <button className="btn-book-therapist">Book</button>
</div>
    </div>
  );
};

export default Itinerary;
