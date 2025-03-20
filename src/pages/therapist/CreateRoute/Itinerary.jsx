import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Modal, Button, List } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import BASE from '../../../constants/base';
import './Itinerary.css';

const { Option } = Select;

const Itinerary = () => {
  const [stepsData, setStepsData] = useState([]);
  const [editingStep, setEditingStep] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTherapists, setAvailableTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate && editingStep) {
      fetchAvailableTherapists(selectedService, selectedDate);
    }
  }, [selectedService, selectedDate, editingStep]);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE.BASE_URL}/service-detail/get-all`);
      setServices(res.data.data);
     
    } catch (error) {
      console.log(error);
    }
  };
  const handleServiceChange = (value) => {
    const service = services.find(s => s.id === value);
    
    if (service?.previousId) {
      const previousService = services.find(s => s.id === service.previousId); 
      const isPreviousBooked = stepsData.some(step => step.service && services.find(s => s.name === step.service)?.id === service.previousId);
      
      if (!isPreviousBooked) {
        Modal.error({
          title: 'Service Dependency',
          content: `You must book "${previousService?.name}" first before booking "${service.name}".`,
        });
        return;
      }
    }
  
    setSelectedService(value);
  };
  
  
  const fetchAvailableTherapists = async (serviceId, date) => {
    try {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const response = await axios.get(
        `${BASE.BASE_URL}/therapist-working-time/get-by-available-time-for-service-detail`,
        { params: { serviceDetailId: serviceId, day: formattedDate } }
      );
      setAvailableTherapists(response.data.data);
    } catch (error) {
      console.error('Error fetching therapists:', error);
      setAvailableTherapists([]);
    }
  };

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
 
   
  const handleEditStep = (stepId) => {
    const step = stepsData.find((s) => s.id === stepId);
    setEditingStep(stepId);
    setSelectedService(step.service ? services.find((s) => s.name === step.service)?.id : null);
    setSelectedDate(step.date ? dayjs(step.date) : null);
    setSelectedTherapist(step.therapist ? { therapistName: step.therapist } : null);
    setSelectedTime(step.time || null);
    if (step.service && step.date) {
      fetchAvailableTherapists(services.find((s) => s.name === step.service)?.id, step.date);
    }
  };

  const handleAddStep = () => {
    setStepsData((prev) => [
      ...prev,
      { id: prev.length + 1, step: `Step ${prev.length + 1}`, service: null, therapist: null, date: null, time: null, price: null }
    ]);
  };

  const handleSaveStep = () => {
    if (selectedService && selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      const service = services.find((s) => s.id === selectedService);
      const updatedStep = {
        id: editingStep,
        step: stepsData.find((s) => s.id === editingStep).step,
        service: service?.name,
        date: formattedDate,
        therapist: selectedTherapist?.therapistName || null,
        therapistId: selectedTherapist?.therapistId || null,
        time: selectedTime || null,
        price: service?.price || 0,
      };

      setStepsData((prev) =>
        prev.map((step) => (step.id === editingStep ? updatedStep : step))
      );
      setEditingStep(null);
      setSelectedService(null);
      setSelectedDate(null);
      setAvailableTherapists([]);
      setSelectedTherapist(null);
      setSelectedTime(null);
    } else {
      Modal.error({
        title: 'Incomplete Step',
        content: 'Please select both a service and a date before saving.',
      });
    }
  };
  const handleDeleteStep = (stepId) => {
    const stepToDelete = stepsData.find(step => step.id === stepId);
    const serviceNameToDelete = stepToDelete.service;
    const serviceToDelete = services.find(s => s.name === serviceNameToDelete);
    
    if (serviceToDelete) {
      
      const dependentServices = services.filter(s => s.previousId === serviceToDelete.id);
      
     
      const dependentSteps = stepsData.filter(step => 
        dependentServices.some(s => s.name === step.service)
      );
      
      if (dependentSteps.length > 0) {
        const dependentServiceNames = dependentSteps.map(step => step.service).join(", ");
       
        Modal.confirm({
          title: 'Delete ?',
          content: `Deleting this step will also remove the ${dependentServiceNames} dependency step. Are you sure you want to delete it?`,
          onOk() {
            
            performDelete(stepId, serviceToDelete.id);
          }
        });
        return;
      }
    }
    
  
    performDelete(stepId);
  };
  
  const performDelete = (stepId, serviceIdToDelete = null) => {
    setStepsData((prev) => {
      let filteredSteps = prev;
      
      if (serviceIdToDelete) {
       
        const dependentServiceIds = services
          .filter(s => s.previousId === serviceIdToDelete)
          .map(s => s.id);
        
      
        const dependentServiceNames = services
          .filter(s => dependentServiceIds.includes(s.id))
          .map(s => s.name);
        
       
        filteredSteps = prev.filter((step) => {
          return (
            step.id !== stepId && 
            !dependentServiceNames.includes(step.service)
          );
        });
      } else {
      
        filteredSteps = prev.filter((step) => step.id !== stepId);
      }
      
     
      return filteredSteps.map((step, index) => ({
        ...step,
        id: index + 1,
        step: `Step ${index + 1}`,
      }));
    });
  };
  
  
  
  
  

  const handleSlotSelect = (therapist, time) => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const isSlotTaken = stepsData.some(
      (step) =>
        step.id !== editingStep &&
        step.date === formattedDate &&
        step.time === time
    );

    if (isSlotTaken) {
      Modal.error({
        title: 'Error',
        content: 'This time slot is already booked in another step.',
      });
      return;
    }

    setSelectedTherapist(therapist);
    setSelectedTime(time);
  };

  const handleBook = async () => {
    const completedSteps = stepsData.filter((step) => step.service && step.date);
    if (completedSteps.length === 0) {
      Modal.error({
        title: 'No Steps to Book',
        content: 'Please add at least one step before booking.',
      });
      return;
    }

    const apoimentID = localStorage.getItem('selectedAppointmentId');
    const bookingData = completedSteps.map((step) => ({
      startHour: step.time || '00:00:00',
      endHour: step.time ? dayjs(step.time, 'HH:mm:ss').add(1, 'hour').format('HH:mm:ss') : '01:00:00',
      day: step.date,
      therapistId: step.therapistId || null,
      name: step.service,
      price: step.price,
    }));

    try {
      console.log("API URL:", `${BASE.BASE_URL}/appointment-detail/create/${apoimentID}`);
console.log("Booking data:", bookingData);
      await axios.post(`${BASE.BASE_URL}/appointment-detail/create/${apoimentID}`, bookingData);
      
      Modal.success({
        title: 'Success',
        content: 'Booking successful!',
      });
      setStepsData([]);
      setEditingStep(null);
      setSelectedService(null);
      setSelectedDate(null);
      setAvailableTherapists([]);
      setSelectedTherapist(null);
      setSelectedTime(null);
      localStorage.removeItem('selectedAppointmentId');
    } catch (error) {
      console.error('Booking failed:', error);
      Modal.error({
        title: 'Booking Failed',
        content: 'Please try again.',
      });
    }
  };

  return (
    <div className="create-booking-container">
      <h2>Create Itinerary</h2>
      <div className="itinerary-content">
       
        <div className="itinerary-summary">
          <h3>Itinerary Summary</h3>
          <List
  bordered
  dataSource={stepsData}
  renderItem={(step) => (
    <List.Item>
      <div className="step-content">
        {step.step}: {step.service || 'Not set'} on {step.date || 'Not set'}{' '}
        {step.therapist ? `with ${step.therapist} at ${step.time}` : ''}
      </div>
      <div className="step-actions">
        <Button type="link" onClick={() => handleEditStep(step.id)}>
          Edit
        </Button>
        <Button type="link" danger onClick={() => { 
  console.log("Deleting step:", step.id); 
  handleDeleteStep(step.id);
}}>
  Delete
</Button>
      </div>
    </List.Item>
  )}
/>
          <Button type="dashed" onClick={handleAddStep} style={{ marginTop: '20px' }}>
            + Add Step
          </Button>
          {stepsData.length > 0 && (
            <Button type="primary" onClick={handleBook} style={{ marginTop: '20px', marginLeft: '10px' }}>
              Book Now
            </Button>
          )}
        </div>

     
        {editingStep && (
          <div className="steps-content">
            <h3>Editing {stepsData.find((s) => s.id === editingStep)?.step}</h3>

            <div>
              <h4>Select a Service</h4>
              <Select
                style={{ width: 200 }}
                placeholder="Select a service"
                onChange={handleServiceChange}
                value={selectedService}
              >
                {services.map((service) => (
                  <Option key={service.id} value={service.id}>
                    {service.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <h4>Choose a Date</h4>
              <DatePicker
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate}
                disabledDate={(current) => current && current <= dayjs().endOf('day')}
              />
            </div>

            {selectedService && selectedDate && (
              <div>
                <h4>Choose Therapist & Time (Optional)</h4>
                {availableTherapists.length > 0 ? (
                  availableTherapists.map((therapist) => (
                    <div key={therapist.therapistId} className="therapist-slots">
                      <h5>{therapist.therapistName}</h5>
                      <ul className="time-slots">
                        {therapist.availableTimeSlots.map((slot, index) => {
                          const slots = generateTimeSlotsForRange(slot.startHour, slot.endHour);
                          return slots.map((time, idx) => {
                            const isBooked = stepsData.some(
                              (s) =>
                                s.id !== editingStep &&
                                s.date === dayjs(selectedDate).format('YYYY-MM-DD') &&
                                s.time === time
                            );
                            return (
                              <li
                                key={`${index}-${idx}`}
                                className={`time-slot-item ${isBooked ? 'booked' : ''} ${
                                  selectedTherapist?.therapistId === therapist.therapistId && selectedTime === time
                                    ? 'selected'
                                    : ''
                                }`}
                                onClick={() => !isBooked && handleSlotSelect(therapist, time)}
                              >
                                {time}
                              </li>
                            );
                          });
                        })}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>Loading therapists or no therapists available...</p>
                )}
              </div>
            )}

            <Button type="primary" onClick={handleSaveStep} style={{ marginTop: '20px' }}>
              Save Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;