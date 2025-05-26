import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Space,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const API_URL = "http://localhost:8000/degree";

const Bangcap = () => {
  const [form] = Form.useForm();
  const [degrees, setDegrees] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDegrees();
  }, []);

  const fetchDegrees = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.bangcap || [];

      const mapped = data.map((item) => ({
        id: item.ma_bang_cap,
        name: item.ten_bang_cap,
        shortName: item.ten_viet_tat,
      }));

      setDegrees(mapped);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bằng cấp:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/${editingId}`, {
          ten_bang_cap: values.name,
          ten_viet_tat: values.shortName,
        });
      } else {
        await axios.post(API_URL, {
          ma_bang_cap: values.id,
          ten_bang_cap: values.name,
          ten_viet_tat: values.shortName,
        });
      }

      form.resetFields();
      setIsEdit(false);
      setEditingId(null);
      fetchDegrees();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu bằng cấp:", error);
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      shortName: record.shortName,
    });
    setEditingId(record.id);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa?",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          fetchDegrees();
        } catch (error) {
          console.error("Lỗi khi xóa bằng cấp:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Mã bằng",
      dataIndex: "id",
    },
    {
      title: "Tên bằng cấp",
      dataIndex: "name",
    },
    {
      title: "Tên viết tắt",
      dataIndex: "shortName",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý bằng cấp</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ id: "", name: "", shortName: "" }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Mã bằng"
              name="id"
              rules={[{ required: true, message: "Nhập mã bằng" }]}
            >
              <Input placeholder="VD: BC01" disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Tên bằng cấp"
              name="name"
              rules={[{ required: true, message: "Nhập tên bằng cấp" }]}
            >
              <Input placeholder="VD: Cử nhân" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Tên viết tắt"
              name="shortName"
              rules={[{ required: true, message: "Nhập tên viết tắt" }]}
            >
              <Input placeholder="VD: CN" />
            </Form.Item>
          </Col>
          <Col span={3} style={{ display: "flex", alignItems: "end" }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              block
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        columns={columns}
        dataSource={degrees}
        rowKey="id"
        pagination={false}
        bordered
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default Bangcap;
