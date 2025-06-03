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

const HeSoGiaoVien = () => {
  const [heSoList, setHeSoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (editingIndex !== null) {
      const updated = [...heSoList];
      updated[editingIndex] = values;
      setHeSoList(updated);
      setEditingIndex(null);
    } else {
      setHeSoList([...heSoList, values]);
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
      const newList = heSoList.filter((_, i) => i !== index);
      setHeSoList(newList);
      Swal.fire("Đã xóa", "", "success");
    }
  };

  const columns = [
    {
      title: "Trình độ",
      dataIndex: "trinhDo",
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
      <Title level={3}>Quản lý hệ số theo bằng cấp</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="trinhDo"
              label="Trình độ"
              rules={[{ required: true, message: "Nhập trình độ" }]}
            >
              <Input placeholder="VD: Cử nhân, Thạc sĩ, Tiến sĩ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="heSo"
              label="Hệ số"
              rules={[{ required: true, message: "Nhập hệ số" }]}
            >
              <Input type="number" step="0.1" placeholder="VD: 1.5" />
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
        dataSource={heSoList}
        rowKey={(_, index) => index}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default HeSoGiaoVien;
