import React, { useState } from 'react';

export default function Quanlykhoa() {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Công nghệ thông tin', code: 'CNTT' },
    { id: 2, name: 'Kinh tế', code: 'KT' }
  ]);

  const [form, setForm] = useState({ id: null, name: '', code: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setDepartments(departments.map(d => d.id === form.id ? form : d));
      setIsEdit(false);
    } else {
      setDepartments([...departments, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', code: '' });
  };

  const handleEdit = (dept) => {
    setForm(dept);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý khoa</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên khoa"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Mã khoa"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Tên khoa</th>
            <th>Mã khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept.id}>
              <td>{dept.name}</td>
              <td>{dept.code}</td>
              <td>
                <button onClick={() => handleEdit(dept)}>Sửa</button>
                <button onClick={() => handleDelete(dept.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
