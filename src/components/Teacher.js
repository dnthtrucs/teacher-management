import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  Input,
  Select,
  Button,
  Form,
  Row,
  Col,
  Space,
  Pagination,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({ ho_ten: "", ma_khoa: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    ma_gv: "",
    ho_ten: "",
    ma_khoa: "",
    ma_bang_cap: "",
    sdt: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchDropdownData();
  }, [page, filter]);

  const fetchTeachers = async () => {
    try {
      const params = { ...filter, page };

      // Convert ma_khoa to ten_khoa for backend filter
      if (params.ma_khoa) {
        const selectedDep = departments.find(
          (dep) => dep.ma_khoa === params.ma_khoa
        );
        if (selectedDep) {
          params.khoa = selectedDep.ten_khoa;
        }
      }
      delete params.ma_khoa;

      const res = await axios.get("http://localhost:8000/teacher", { params });
      setTeachers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách giảng viên:", err);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [resKhoa, resBangCap] = await Promise.all([
        axios.get("http://localhost:8000/faculty"),
        axios.get("http://localhost:8000/degree"),
      ]);
      setDepartments(resKhoa.data.faculty || []);
      setDegrees(resBangCap.data.bangcap || []);
    } catch (err) {
      console.error("Lỗi khi lấy khoa/bằng cấp:", err);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8000/teacher/${formData.ma_gv}`,
          values
        );
        Swal.fire("Cập nhật thành công", "", "success");
      } else {
        await axios.post("http://localhost:8000/teacher", values);
        Swal.fire("Thêm thành công", "", "success");
      }
      setIsEditing(false);
      form.resetFields();
      fetchTeachers();
    } catch (err) {
      Swal.fire("Lỗi khi gửi dữ liệu", err.message, "error");
    }
  };

  const handleEdit = (teacher) => {
    setFormData(teacher);
    setIsEditing(true);
    form.setFieldsValue(teacher);
  };

  const handleDelete = async (ma_gv) => {
    const confirm = await Swal.fire({
      title: "Xác nhận xóa?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/teachers/${ma_gv}`);
        fetchTeachers();
        Swal.fire("Đã xóa", "", "success");
      } catch (err) {
        Swal.fire("Lỗi khi xóa", err.message, "error");
      }
    }
  };

  const columns = [
    {
      title: "Mã giảng viên",
      dataIndex: 'ma_gv',
    },
    {
      title: "Họ tên",
      dataIndex: "ho_ten",
    },
    {
      title: "Khoa",
      dataIndex: "ten_khoa",
    },
    {
      title: "Bằng cấp",
      dataIndex: "ten_bang_cap",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "sdt",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.ma_gv)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý giảng viên</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formData}
      >
        <Row gutter={16}>
           <Col span={6}>
            <Form.Item
              name="ma_gv"
              label="Mã giảng viên"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập mã giảng viên" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="ho_ten"
              label="Họ tên"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="ma_khoa"
              label="Khoa"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn khoa">
                {departments.map((dep) => (
                  <Option key={dep.ma_khoa} value={dep.ma_khoa}>
                    {dep.ten_khoa}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="ma_bang_cap"
              label="Bằng cấp"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn bằng cấp">
                {degrees.map((deg) => (
                  <Option key={deg.ma_bang_cap} value={deg.ma_bang_cap}>
                    {deg.ten_bang_cap} ({deg.ten_viet_tat})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="sdt"
              label="Số điện thoại"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          {isEditing ? "Cập nhật" : "Thêm"}
        </Button>
      </Form>

      <br />

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            placeholder="Tìm theo tên"
            value={filter.ho_ten}
            onChange={(e) =>
              setFilter({ ...filter, ho_ten: e.target.value })
            }
          />
        </Col>
        <Col span={6}>
          <Select
            style={{ width: "100%" }}
            value={filter.ma_khoa}
            onChange={(value) => setFilter({ ...filter, ma_khoa: value })}
            placeholder="Lọc theo khoa"
            allowClear
          >
            {departments.map((dep) => (
              <Option key={dep.ma_khoa} value={dep.ma_khoa}>
                {dep.ten_khoa}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={teachers}
        rowKey="ma_gv"
        pagination={false}
        bordered
      />

      <Pagination
        style={{ marginTop: 16 }}
        current={page}
        total={totalPages * 10}
        pageSize={10}
        onChange={(page) => setPage(page)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default TeacherList;
