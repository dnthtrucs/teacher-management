import React, { useState } from 'react';

export default function Teacher() {
  const degrees = ['Cử nhân', 'Thạc sĩ', 'Tiến sĩ'];
  const departments = ['CNTT', 'Kinh tế', 'Ngoại ngữ', 'Luật'];

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      degree: 'Thạc sĩ',
      department: 'CNTT',
      email: 'a@university.edu',
      phone: '0123456789'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      degree: 'Cử nhân',
      department: 'Kinh tế',
      email: 'b@university.edu',
      phone: '0987654321'
    }
  ]);

  const [form, setForm] = useState({
    id: null,
    name: '',
    degree: '',
    department: '',
    email: '',
    phone: ''
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setTeachers(teachers.map(t => (t.id === form.id ? form : t)));
      setIsEdit(false);
    } else {
      setTeachers([...teachers, { ...form, id: Date.now() }]);
    }
    setForm({
      id: null,
      name: '',
      degree: '',
      department: '',
      email: '',
      phone: ''
    });
  };

  const handleEdit = (teacher) => {
    setForm(teacher);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa không?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý giảng viên</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên giảng viên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
          required
        >
          <option value="">-- Chọn bằng cấp --</option>
          {degrees.map(degree => (
            <option key={degree} value={degree}>{degree}</option>
          ))}
        </select>

        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        >
          <option value="">-- Chọn khoa --</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

<table className="table">
  <thead>
    <tr>
      <th>STT</th>
      <th>Tên</th>
      <th>Bằng cấp</th>
      <th>Khoa</th>
      <th>Email</th>
      <th>SĐT</th>
      <th>Hành động</th>
    </tr>
  </thead>
  <tbody>
    {teachers.map((t, index) => (
      <tr key={t.id}>
        <td>{index + 1}</td> {/* STT bắt đầu từ 1 */}
        <td>{t.name}</td>
        <td>{t.degree}</td>
        <td>{t.department}</td>
        <td>{t.email}</td>
        <td>{t.phone}</td>
        <td>
          <button onClick={() => handleEdit(t)}>Sửa</button>
          <button onClick={() => handleDelete(t.id)}>Xóa</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
