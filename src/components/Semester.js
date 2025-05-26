import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Space,
  message
} from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

export default function SemesterManagement() {
  const [semesters, setSemesters] = useState(() => {
    const saved = localStorage.getItem('semesters');
    return saved ? JSON.parse(saved) : [];
  });

  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('semesters', JSON.stringify(semesters));
  }, [semesters]);

  const handleSubmit = (values) => {
    const formatted = {
      ...values,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
    };

    if (editingId) {
      setSemesters(
        semesters.map((s) => (s.id === editingId ? { ...formatted, id: editingId } : s))
      );
      message.success('Cập nhật kỳ học thành công!');
    } else {
      setSemesters([...semesters, { ...formatted, id: Date.now() }]);
      message.success('Thêm kỳ học mới thành công!');
    }

    form.resetFields();
    setEditingId(null);
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      startDate: dayjs(record.startDate),
      endDate: dayjs(record.endDate),
    });
    setEditingId(record.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      setSemesters(semesters.filter((s) => s.id !== id));
      message.success('Đã xóa kỳ học.');
    }
  };

  const columns = [
    {
      title: 'STT',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tên kỳ',
      dataIndex: 'name',
    },
    {
      title: 'Năm học',
      dataIndex: 'year',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý kỳ học</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginBottom: 32 }}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item
              name="name"
              label="Tên kỳ"
              rules={[{ required: true, message: 'Vui lòng nhập tên kỳ học' }]}
            >
              <Input placeholder="VD: HK1" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="year"
              label="Năm học"
              rules={[{ required: true, message: 'Vui lòng nhập năm học' }]}
            >
              <Input placeholder="VD: 2024-2025" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="startDate"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
              rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4} style={{ display: 'flex', alignItems: 'end' }}>
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
        dataSource={semesters}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
