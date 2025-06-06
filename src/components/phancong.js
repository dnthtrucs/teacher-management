import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Select,
  Button,
  Typography,
  Row,
  Col,
  Space,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const Phancong = () => {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("teachingAssignments");
    return saved ? JSON.parse(saved) : [];
  });

  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Danh sách lớp học phần đã được lưu từ component CourseClass
  const classSections = JSON.parse(localStorage.getItem("classSections")) || [];

  // Giả sử đây là danh sách giảng viên mẫu
  const teachers = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];

  useEffect(() => {
    localStorage.setItem("teachingAssignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleFinish = (values) => {
    const classInfo = classSections.find(c => c.id === values.classId);
    const newEntry = {
      id: isEdit ? editId : Date.now(),
      teacher: values.teacher,
      classId: classInfo.id,
      semester: classInfo.semester,
      course: classInfo.course,
      classCode: classInfo.classCode,
      className: classInfo.className,
    };

    if (isEdit) {
      setAssignments(prev =>
        prev.map(item => (item.id === editId ? newEntry : item))
      );
      setIsEdit(false);
      setEditId(null);
      message.success("Cập nhật phân công thành công");
    } else {
      setAssignments([...assignments, newEntry]);
      message.success("Thêm phân công thành công");
    }

    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      teacher: record.teacher,
      classId: record.classId,
    });
    setEditId(record.id);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phân công này?")) {
      setAssignments(assignments.filter(item => item.id !== id));
    }
  };

  const getStatistics = () => {
    const stats = {};
    for (const item of assignments) {
      const key = `${item.semester}-${item.teacher}`;
      if (!stats[key]) {
        stats[key] = {
          semester: item.semester,
          teacher: item.teacher,
          totalClasses: 0,
        };
      }
      stats[key].totalClasses += 1;
    }
    return Object.values(stats);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Phân công giảng viên dạy lớp học phần</Title>

      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="classId" label="Lớp học phần" rules={[{ required: true }]}>
              <Select placeholder="Chọn lớp học phần">
                {classSections.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {`${c.classCode} - ${c.className} (${c.semester})`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="teacher" label="Giảng viên" rules={[{ required: true }]}>
              <Select placeholder="Chọn giảng viên">
                {teachers.map((t) => (
                  <Option key={t} value={t}>
                    {t}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: "flex", alignItems: "end" }}>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              {isEdit ? "Cập nhật" : "Thêm phân công"}
            </Button>
          </Col>
        </Row>
      </Form>

      <br />
      <Title level={4}>Danh sách phân công</Title>
      <Table
        dataSource={assignments}
        rowKey="id"
        bordered
        pagination={false}
        columns={[
          { title: "Kỳ học", dataIndex: "semester" },
          { title: "Học phần", dataIndex: "course" },
          { title: "Mã lớp", dataIndex: "classCode" },
          { title: "Tên lớp", dataIndex: "className" },
          { title: "Giảng viên", dataIndex: "teacher" },
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
      <Title level={4}>Thống kê phân công theo học kỳ</Title>
      <Table
        dataSource={getStatistics()}
        rowKey={(record) => `${record.semester}-${record.teacher}`}
        bordered
        pagination={false}
        columns={[
          { title: "Kỳ học", dataIndex: "semester" },
          { title: "Giảng viên", dataIndex: "teacher" },
          { title: "Số lớp được phân công", dataIndex: "totalClasses" },
        ]}
      />
    </div>
  );
};

export default Phancong;
