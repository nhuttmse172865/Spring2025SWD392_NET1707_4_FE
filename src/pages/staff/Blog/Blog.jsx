import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Upload, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import BASE from "../../../constants/base";
import "./ManagerBlog.css";
import { jwtDecode } from "jwt-decode";
const ManagerBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/blog/getAll`);
      setBlogs(res.data.data);
    } catch (error) {
      message.error("Failed to fetch blogs!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE.BASE_URL}/blog/delete/${id}`);
      message.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      message.error("Failed to delete blog!");
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditData(null);
    form.resetFields();
    setFile(null); // Reset file
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
          const token = localStorage.getItem('customer_information');
          const decode = jwtDecode(token);
          const accountId = decode.accountId; 
      const values = await form.validateFields();

      // Tạo FormData để gửi dạng multipart/form-data
      const formData = new FormData();
      formData.append("blog", JSON.stringify(values));
      if (file) {
        formData.append("image", file);
      }

      if (editData) {
        // Update Blog
        await axios.put(`${BASE.BASE_URL}/blog/update/${editData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Blog updated successfully!");
      } else {
        // Create Blog
        await axios.post(`${BASE.BASE_URL}/blog/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Blog created successfully!");
      }

      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      message.error("An error occurred!");
    }
  };

  const handleUpload = ({ file }) => {
    setFile(file); // Lưu ảnh vào state
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Summary", dataIndex: "summary", key: "summary" },
    { title: "Author", dataIndex: "authorName", key: "authorName" },
    { title: "Content", dataIndex: "content", key: "content" },
    
    {
      title: "Created Date",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" className="blog-btn-edit" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm title="Are you sure you want to delete this blog?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Button type="link" className="blog-btn-delete">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="blog-container-staff">
      <Button className="blog-create-btn" onClick={handleCreate}>Add Blog</Button>
      <Table className="blog-table-staff" columns={columns} dataSource={blogs} rowKey="id" loading={loading} pagination={{ pageSize: 5 }} />

      <Modal title={editData ? "Edit Blog" : "Add Blog"} open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)} className="blog-modal">
        <Form form={form} layout="vertical" className="blog-form">
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Headline" name="Headline" rules={[{ required: true, message: "Please enter a Headline!" }]}>
            <Input  />
          </Form.Item>
          <Form.Item label="Content" name="Content" rules={[{ required: true, message: "Please enter a content!" }]}>
          <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Summary" name="summary" rules={[{ required: true, message: "Please enter a summary!" }]}>
            <Input.TextArea rows={4}/>
          </Form.Item>
         
          <Form.Item label="Upload Image">
            <Upload beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerBlog;
