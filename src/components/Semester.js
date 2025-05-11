import React, { useState } from 'react';

export default function Semester() {
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'HK1', year: '2024-2025' },
    { id: 2, name: 'HK2', year: '2024-2025' }
  ]);

  const [form, setForm] = useState({ id: null, name: '', year: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setSemesters(semesters.map(s => s.id === form.id ? form : s));
      setIsEdit(false);
    } else {
      setSemesters([...semesters, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', year: '' });
  };

  const handleEdit = (s) => {
    setForm(s);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý học kỳ - niên khóa</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Học kỳ (VD: HK1)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Niên khóa (VD: 2024-2025)"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Học kỳ</th>
            <th>Niên khóa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.year}</td>
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
