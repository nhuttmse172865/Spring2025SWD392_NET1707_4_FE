import React, { useState } from 'react';
import { Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

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

  return (
    <div className='create-booking-therapist'>
      <div className="header-booking-therapist">
        <div className="select-service-therapist">
          <Select
            className='select-service-therapist'
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(value) => console.log(`selected ${value}`)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>
        <div className="select-date">
          <DatePicker onChange={handleDateChange} />
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
    </div>
  );
};

export default Itinerary;
