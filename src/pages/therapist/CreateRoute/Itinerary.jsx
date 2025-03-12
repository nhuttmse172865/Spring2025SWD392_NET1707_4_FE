import React, { useEffect, useState } from 'react';
import { Select, DatePicker,Modal} from 'antd';
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
  const [availableTherapists, setAvailableTherapists] = useState([]);
  const [bookingSummaries, setBookingSummaries] = useState([]); 

  const generateTimeSlotsForRange = (startHour, endHour) => {
    const slots = [];
    let currentTime = dayjs(startHour, 'HH:mm:ss');
    const endTime = dayjs(endHour, 'HH:mm:ss');

    while (currentTime.isBefore(endTime)) {
      slots.push(currentTime.format('HH:mm:ss'));
      currentTime = currentTime.add(60, 'minute');
    }
    return slots;
  };

  const fetchAvailableTherapists = async (serviceId, date) => {
    try {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const response = await axios.get(
        `${BASE.BASE_URL}/therapist-working-time/get-by-available-time-for-service-detail`,
        {
          params: {
            serviceDetailId: serviceId,
            day: formattedDate
          }
        }
      );
      
      const therapistsData = response.data.data;
      setAvailableTherapists(therapistsData);
    } catch (error) {
      console.error('Error fetching available therapists:', error);
      setAvailableTherapists([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date && selectedService) {
      fetchAvailableTherapists(selectedService, date);
    }
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
    if (selectedDate) {
      fetchAvailableTherapists(value, selectedDate);
    }
  };

  const handleSlotSelect = (therapist, time) => {
    const service = services.find(s => s.id === selectedService);
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
  
    // Kiểm tra xem slot đã được chọn cho bất kỳ dịch vụ nào khác chưa
    const isSlotTaken = bookingSummaries.some(
      booking => booking.date === formattedDate && booking.time === time
    );
  
    if (isSlotTaken) {
      
      Modal.error({
        title: 'Error',
        content: 'This time slot is already booked for another service.',
      });
      return;
    }
  
    const newBooking = {
      service: service?.name,
      serviceId: selectedService,
      therapist: therapist.therapistName,
      therapistId: therapist.therapistId,
      date: formattedDate,
      time: time,
      price: service?.price || 0, 
    };
  
    // Kiểm tra nếu đã có booking cho service này -> cập nhật lại
    setBookingSummaries(prev => {
      const existingIndex = prev.findIndex(booking => booking.serviceId === selectedService);
      if (existingIndex !== -1) {
        const updatedSummaries = [...prev];
        updatedSummaries[existingIndex] = newBooking;
        return updatedSummaries;
      }
      return [...prev, newBooking];
    });
  };
  


  const handleRemoveBooking = (bookingId) => {
    setBookingSummaries(prev => prev.filter(booking => booking.id !== bookingId));
  };

  const handleBook = async () => {
    const apoimentID = localStorage.getItem('selectedAppointmentId');
    const bookingData = bookingSummaries.map(booking => ({
      startHour: booking.time,
      endHour: dayjs(booking.time, 'HH:mm:ss').add(1, 'hour').format('HH:mm:ss'),
      day: booking.date,
      therapistId: booking.therapistId,
      name: booking.service,
      price: booking.price,
    }));
    try {
      const res = await axios.post(`${BASE.BASE_URL}/appointment-detail/create/${apoimentID}`, bookingData);
      Modal.success({
        title: 'Success',
        content: 'Create successful!',
      });
      setBookingSummaries([]);
    } catch (error) {
      console.error('Error  appointments:', error)
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE.BASE_URL}/service-detail/get-all`);
      setServices(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='create-booking-container'>
      <div className='create-booking-therapist'>
        <div className="header-booking-therapist">
          <div className="select-service-therapist">
            <Select
              className='select-service-therapist'
              showSearch
              style={{ width: 200 }}
              placeholder="Select a service"
              optionFilterProp="children"
              onChange={handleServiceChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {services.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="select-date">
            <DatePicker 
              onChange={handleDateChange} 
              className='datepicker-itinerary'
            />
          </div>
        </div>

        {selectedDate && selectedService && availableTherapists.length > 0 && (
          <div className="time-slots">
            <h3>Available Slots for {dayjs(selectedDate).format('YYYY-MM-DD')}</h3>
            {availableTherapists.map((therapist) => (
              <div key={therapist.therapistId} className="therapist-slots">
                <h4>{therapist.therapistName}</h4>
                <ul>
                  {therapist.availableTimeSlots.map((slot, index) => {
                    const slots = generateTimeSlotsForRange(slot.startHour, slot.endHour);
                    return slots.map((time, idx) => {
                      const isSelected = bookingSummaries.some(
                        booking => booking.therapist === therapist.therapistName && 
                                booking.time === time
                      );
                      return (
                        <li 
                          key={`${index}-${idx}`} 
                          className={`time-slot-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSlotSelect(therapist, time)}
                        >
                          {time}
                        </li>
                      );
                    });
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="btn-container">
          <button 
            className="btn-book-therapist" 
            onClick={() => setBookingSummaries([])}
            disabled={bookingSummaries.length === 0}
          >
            Clear All Selections
          </button>
        </div>
      </div>

      {bookingSummaries.length > 0 && (
        <div className="booking-summary">
          <h3>Booking Summary ({bookingSummaries.length} items)</h3>
          <div className="summary-details">
            {bookingSummaries.map((booking) => (
              <div key={booking.id} className="booking-item">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Therapist:</strong> {booking.therapist}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Price: </strong> {booking.price}$</p>
                <button 
                  className="btn-remove-booking"
                  onClick={() => handleRemoveBooking(booking.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button className="btn-book-final" onClick={handleBook}>
            Book All ({bookingSummaries.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
