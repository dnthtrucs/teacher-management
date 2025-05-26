import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Space,
  message,
} from 'antd';

const { Title } = Typography;

export default function CourseManagement() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleSubmit = (values) => {
    if (editingId) {
      setCourses(
        courses.map((c) => (c.id === editingId ? { ...values, id: editingId } : c))
      );
      message.success('Cập nhật học phần thành công!');
    } else {
      setCourses([...courses, { ...values, id: Date.now() }]);
      message.success('Thêm học phần mới thành công!');
    }
    form.resetFields();
    setEditingId(null);
  };

  const handleEdit = (course) => {
    form.setFieldsValue(course);
    setEditingId(course.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Xóa học phần này?')) {
      setCourses(courses.filter((c) => c.id !== id));
      message.success('Đã xóa học phần.');
    }
  };

  const columns = [
    {
      title: 'STT',
      render: (_, __, index) => index + 1,
      key: 'index',
    },
    {
      title: 'Mã số',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên học phần',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: 'Hệ số',
      dataIndex: 'coefficient',
      key: 'coefficient',
    },
    {
      title: 'Số tiết',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý học phần</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginBottom: 32 }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="code"
              label="Mã số"
              rules={[{ required: true, message: 'Vui lòng nhập mã số' }]}
            >
              <Input placeholder="VD: CS101" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="name"
              label="Tên học phần"
              rules={[{ required: true, message: 'Vui lòng nhập tên học phần' }]}
            >
              <Input placeholder="VD: Nhập môn lập trình" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="credits"
              label="Số tín chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="coefficient"
              label="Hệ số"
              rules={[{ required: true, message: 'Vui lòng nhập hệ số' }]}
            >
              <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="hours"
              label="Số tiết"
              rules={[{ required: true, message: 'Vui lòng nhập số tiết' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={3} style={{ display: 'flex', alignItems: 'end' }}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingId ? 'Cập nhật' : 'Thêm mới'}
                </Button>
                {editingId && (
                  <Button onClick={() => {
                    form.resetFields();
                    setEditingId(null);
                  }}>
                    Hủy
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        dataSource={courses}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
