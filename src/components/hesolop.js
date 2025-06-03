import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Form,
  Row,
  Col,
  Space,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Title } = Typography;

const HeSoLop = () => {
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (editingIndex !== null) {
      const updated = [...list];
      updated[editingIndex] = values;
      setList(updated);
      setEditingIndex(null);
    } else {
      setList([...list, values]);
    }
    form.resetFields();
  };

  const handleEdit = (record, index) => {
    form.setFieldsValue(record);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
    });
    if (confirm.isConfirmed) {
      const newList = list.filter((_, i) => i !== index);
      setList(newList);
      Swal.fire("Đã xóa", "", "success");
    }
  };

  const columns = [
    {
      title: "Từ sĩ số",
      dataIndex: "tu",
    },
    {
      title: "Đến sĩ số",
      dataIndex: "den",
    },
    {
      title: "Hệ số",
      dataIndex: "heSo",
    },
    {
      title: "Hành động",
      render: (_, record, index) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record, index)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(index)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý hệ số lớp theo sĩ số</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="tu"
              label="Từ sĩ số"
              rules={[{ required: true, message: "Nhập sĩ số bắt đầu" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="den"
              label="Đến sĩ số"
              rules={[{ required: true, message: "Nhập sĩ số kết thúc" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="heSo"
              label="Hệ số"
              rules={[{ required: true, message: "Nhập hệ số" }]}
            >
              <Input type="number" step="0.1" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          {editingIndex !== null ? "Cập nhật" : "Thêm"}
        </Button>
      </Form>

      <br />

      <Table
        columns={columns}
        dataSource={list}
        rowKey={(_, index) => index}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default HeSoLop;
