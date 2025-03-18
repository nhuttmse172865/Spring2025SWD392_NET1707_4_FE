import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Upload, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import BASE from "../../../constants/base";
import { jwtDecode } from "jwt-decode";
import "./ManagerBlog.css";

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

  const handleCreate = () => {
    setEditData(null);
    form.resetFields();
    setFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditData(record);
    form.setFieldsValue({
      title: record.title,
      headline: record.headline,
      content: record.content,
      summary: record.summary,
    });
    setIsModalOpen(true);
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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("customer_information");
      const decode = jwtDecode(token);
      const accountId = decode.accountId;

      const formData = new FormData();
      formData.append(
        "blog",
        JSON.stringify({
          title: values.title,
          headline: values.headline,
          content: values.content,
          summary: values.summary,
          accountId,
        })
      );

      if (file) {
        formData.append("image", file);
      }

      setLoading(true);

      let response;
      if (editData) {
        response = await axios.put(
          `${BASE.BASE_URL}/blog/update/${editData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        message.success("Blog updated successfully!");
      } else {
        response = await axios.post(`${BASE.BASE_URL}/blog/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Blog created successfully!");
      }

      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      message.error(error.response?.data.message || "Failed to save blog!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = ({ file }) => {
    setFile(file);
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Summary", dataIndex: "summary", key: "summary" },
    { title: "Author", dataIndex: "authorName", key: "authorName" },
    {
      title: "Image",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (text) =>
        text ? <img src={text} alt="Image" style={{ width: "120px", height: "auto" }} /> : "No image",
    },
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

      <Modal
        title={editData ? "Edit Blog" : "Create Blog"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editData ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="headline" label="Headline" rules={[{ required: true, message: "Please input the headline!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: "Please input the content!" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="summary" label="Summary" rules={[{ required: true, message: "Please input the summary!" }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {editData?.thumbnailUrl && <img src={editData.thumbnailUrl} alt="Existing" style={{ width: 120, marginTop: 8 }} />}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerBlog;
