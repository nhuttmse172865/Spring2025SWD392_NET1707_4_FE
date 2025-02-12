import React, { useState } from 'react';
import './Schedule.css';
import { Table, Tag } from 'antd';

const Schedule = () => {
  const [schedule, setSchedule] = useState([
    {
      key: '1',
      date: '2025-02-15',
      startTime: '09:00',
      endTime: '10:00',
      status: 'Pending',
    },
    {
      key: '2',
      date: '2025-02-15',
      startTime: '11:00',
      endTime: '12:00',
      status: 'Completed',
    },
    {
      key: '3',
      date: '2025-02-16',
      startTime: '14:00',
      endTime: '15:00',
      status: 'Cancelled',
    },
  ]);

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
        let color = status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Schedule</h2>
      <Table columns={columns} dataSource={schedule} pagination={false} className="schedule-table" />
    </div>
  );
};

export default Schedule;
