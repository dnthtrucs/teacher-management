import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Typography, Row, Col, Space, message } from 'antd';

const { Title } = Typography;

export default function QuanLyKhoa() {
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('departments');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Công nghệ thông tin', code: 'CNTT' },
      { id: 2, name: 'Kinh tế', code: 'KT' }
    ];
  });

  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const handleSubmit = (values) => {
    if (editingId) {
      const updated = departments.map(dept =>
        dept.id === editingId ? { ...values, id: editingId } : dept
      );
      setDepartments(updated);
      message.success('Cập nhật thành công!');
    } else {
      const newDept = { ...values, id: Date.now() };
      setDepartments([...departments, newDept]);
      message.success('Thêm mới thành công!');
    }
    form.resetFields();
    setEditingId(null);
  };

  const handleEdit = (dept) => {
    form.setFieldsValue(dept);
    setEditingId(dept.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
      message.success('Đã xóa!');
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tên khoa',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã khoa',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý khoa</Title>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Tên khoa"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên khoa' }]}
            >
              <Input placeholder="Công nghệ thông tin" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Mã khoa"
              name="code"
              rules={[{ required: true, message: 'Vui lòng nhập mã khoa' }]}
            >
              <Input placeholder="CNTT" />
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', alignItems: 'end' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              {editingId && (
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    form.resetFields();
                    setEditingId(null);
                  }}
                >
                  Hủy
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        columns={columns}
        dataSource={departments}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
