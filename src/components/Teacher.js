import React, { useState } from 'react';

export default function Teacher() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Nguyễn Văn A', degree: 'Thạc sĩ', department: 'CNTT' },
    { id: 2, name: 'Trần Thị B', degree: 'Cử nhân', department: 'Kinh tế' }
  ]);

  const [form, setForm] = useState({ id: null, name: '', degree: '', department: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setTeachers(teachers.map(t => (t.id === form.id ? form : t)));
      setIsEdit(false);
    } else {
      setTeachers([...teachers, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', degree: '', department: '' });
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
        <input
          type="text"
          placeholder="Bằng cấp"
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Khoa"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Bằng cấp</th>
            <th>Khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.degree}</td>
              <td>{t.department}</td>
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
