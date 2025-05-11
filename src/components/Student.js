import React, { useState } from 'react';

export default function Student() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', mssv: 'SV001', className: 'CNTT1' },
    { id: 2, name: 'Trần Thị B', mssv: 'SV002', className: 'KT1' }
  ]);

  const [form, setForm] = useState({ id: null, name: '', mssv: '', className: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setStudents(students.map(s => s.id === form.id ? form : s));
      setIsEdit(false);
    } else {
      setStudents([...students, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', mssv: '', className: '' });
  };

  const handleEdit = (student) => {
    setForm(student);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý sinh viên</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Họ tên sinh viên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Mã số sinh viên"
          value={form.mssv}
          onChange={(e) => setForm({ ...form, mssv: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Lớp"
          value={form.className}
          onChange={(e) => setForm({ ...form, className: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Mã số sinh viên</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.mssv}</td>
              <td>{s.className}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Sửa</button>
                <button onClick={() => handleDelete(s.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
