import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import {
  Table,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const CourseClass = () => {
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem("courseClasses");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            semester: "HK1 - 2024-2025",
            course: "Lập trình Web",
            classCode: "LPW01",
            className: "Lập trình Web lớp 1",
            studentCount: 35,
          },
        ];
  });

  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const semesters = Array.from({ length: 6 }, (_, i) => {
    const year = 2020 + i;
    return [`HK1 - ${year}-${year + 1}`, `HK2 - ${year}-${year + 1}`, `HK3 - ${year}-${year + 1}`];
  }).flat();

  useEffect(() => {
    localStorage.setItem("courseClasses", JSON.stringify(classes));
    localStorage.setItem("classSections", JSON.stringify(classes)); // Dùng cho thống kê
  }, [classes]);

  const handleFinish = (values) => {
    const newEntry = {
      ...values,
      studentCount: parseInt(values.studentCount, 10),
    };

    if (isEdit) {
      setClasses((prev) =>
        prev.map((c) => (c.id === editId ? { ...newEntry, id: editId } : c))
      );
      setIsEdit(false);
      setEditId(null);
    } else {
      setClasses([...classes, { ...newEntry, id: Date.now() }]);
    }

    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditId(record.id);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lớp học phần này?")) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  const getStatistics = () => {
    const stats = {};
    for (const c of classes) {
      const key = `${c.semester}-${c.course}`;
      if (!stats[key]) {
        stats[key] = {
          semester: c.semester,
          course: c.course,
          totalClasses: 0,
          totalStudents: 0,
        };
      }
      stats[key].totalClasses += 1;
      stats[key].totalStudents += c.studentCount;
    }
    return Object.values(stats);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý lớp học phần</Title>

      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="semester" label="Kỳ học" rules={[{ required: true }]}>
              <Select placeholder="Chọn kỳ học">
                {semesters.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="course" label="Tên học phần" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="classCode" label="Mã lớp học phần" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="className" label="Tên lớp học phần" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="studentCount"
              label="Số sinh viên"
              rules={[{ required: true, type: "number", min: 1 }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          {isEdit ? "Cập nhật" : "Thêm lớp học phần"}
        </Button>
      </Form>

      <br />
      <Title level={4}>Danh sách lớp học phần</Title>
      <Table
        dataSource={classes}
        rowKey="id"
        bordered
        pagination={false}
        columns={[
          { title: "Kỳ học", dataIndex: "semester" },
          { title: "Học phần", dataIndex: "course" },
          { title: "Mã lớp", dataIndex: "classCode" },
          { title: "Tên lớp", dataIndex: "className" },
          { title: "Số SV", dataIndex: "studentCount" },
          {
            title: "Hành động",
            render: (_, record) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
              </Space>
            ),
          },
        ]}
      />

      <br />
      <Title level={4}>Thống kê lớp học phần đã mở</Title>
      <Table
        dataSource={getStatistics()}
        rowKey={(record) => `${record.semester}-${record.course}`}
        bordered
        pagination={false}
        columns={[
          { title: "Kỳ học", dataIndex: "semester" },
          { title: "Học phần", dataIndex: "course" },
          { title: "Số lớp", dataIndex: "totalClasses" },
          { title: "Tổng số SV", dataIndex: "totalStudents" },
        ]}
      />
    </div>
  );
};

export default CourseClass;
