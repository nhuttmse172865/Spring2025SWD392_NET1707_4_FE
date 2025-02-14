import React, { useState } from "react";
import { Calendar, Modal, Button, Form, Input, Select } from "antd";
import './ChangeShedule.css'

const { Option } = Select;

const ChangeSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form] = Form.useForm();

  const onSelectDate = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log("New Schedule:", { date: selectedDate, ...values });
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  return (
    <div className="schedule-container">
      {/* <h1 className="schedule-title">Doctor's Working Schedule</h1> */}
      <Calendar fullscreen={false} onSelect={onSelectDate} />

    
      <Modal
        title="Change Working Schedule"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="schedule-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Selected Date">
            <Input value={selectedDate} disabled className="schedule-date" />
          </Form.Item>
          <Form.Item
            label="Available Time"
            name="time"
            rules={[{ required: true, message: "Please select a time slot!" }]}
          >
            <Select placeholder="Select time slot">
              <Option value="08:00 - 12:00">08:00 - 12:00</Option>
              <Option value="13:00 - 17:00">13:00 - 17:00</Option>
              <Option value="18:00 - 21:00">18:00 - 21:00</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Notes" name="notes">
            <Input.TextArea placeholder="Add any notes..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit} className="save-button">
              Save Schedule
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangeSchedule;
