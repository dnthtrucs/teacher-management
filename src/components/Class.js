import React, { useState } from 'react';

export default function Class() {
  const [classes, setClasses] = useState([
    { id: 1, name: 'CNTT1', major: 'Công nghệ thông tin' },
    { id: 2, name: 'KT1', major: 'Kế toán' }
  ]);

  const [form, setForm] = useState({ id: null, name: '', major: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setClasses(classes.map(c => c.id === form.id ? form : c));
      setIsEdit(false);
    } else {
      setClasses([...classes, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', major: '' });
  };

  const handleEdit = (cls) => {
    setForm(cls);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý lớp học</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên lớp (VD: CNTT1)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ngành học"
          value={form.major}
          onChange={(e) => setForm({ ...form, major: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Tên lớp</th>
            <th>Ngành học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.major}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Sửa</button>
                <button onClick={() => handleDelete(c.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
