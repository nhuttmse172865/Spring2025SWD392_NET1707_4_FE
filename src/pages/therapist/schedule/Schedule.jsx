import React, { useEffect, useState } from 'react';
import './Schedule.css';
import { DatePicker, Table, Tag } from 'antd';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import BASE from '../../../constants/base';
import dayjs from 'dayjs';
const Schedule = () => {
  const [schedule, setSchedule] = useState([

  ]);
 const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  useEffect(() => {
    feachSchedule();
  }, []);
  const feachSchedule = async () => {
    const token = localStorage.getItem('customer_information');
    const decode = jwtDecode(token);
    const accountId = decode.accountId; 
  try {
    const res = await axios.get(`${BASE.BASE_URL}/therapist-working-time/get-by-account-id/${accountId}`);
    const formatData = res.data.data.map((item) => {
      return {
        key: item.id,
        date: item.day,
        startTime: item.startHour,
        endTime: item.endHour,
        status: item.status,
      };
    });
    setSchedule(formatData);
    
  } catch (error) {
    console.log(error);
    
  }
  };
 const filterSchedule = schedule.filter((item) =>item.date === selectedDate);
  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'AVAILABLE' ? 'green' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="schedule-page">
      {/* <h2 className="schedule-title">Schedule</h2> */}
      <DatePicker className="schedule-datepicker" 
        value={dayjs(selectedDate)}
        onChange ={(date,dateString) => setSelectedDate(dateString)}
      />
      <Table columns={columns} dataSource={filterSchedule} pagination={false} className="schedule-table" />
    </div>
  );
};

export default Schedule;
