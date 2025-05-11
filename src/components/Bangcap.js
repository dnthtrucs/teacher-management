import React, { useState } from 'react';

export default function Bangcap() {
  const [degrees, setDegrees] = useState([
    { id: 1, code: 'BC01', name: 'Cử nhân', shortName: 'CN' },
    { id: 2, code: 'BC02', name: 'Thạc sĩ', shortName: 'ThS' }
  ]);

  const [form, setForm] = useState({ id: null, code: '', name: '', shortName: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setDegrees(degrees.map(d => (d.id === form.id ? form : d)));
      setIsEdit(false);
    } else {
      setDegrees([...degrees, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, code: '', name: '', shortName: '' });
  };

  const handleEdit = (degree) => {
    setForm(degree);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setDegrees(degrees.filter(d => d.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý bằng cấp</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Mã bằng cấp (VD: BC01)"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tên bằng cấp (VD: Cử nhân)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tên viết tắt (VD: CN)"
          value={form.shortName}
          onChange={(e) => setForm({ ...form, shortName: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên bằng cấp</th>
            <th>Viết tắt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {degrees.map(d => (
            <tr key={d.id}>
              <td>{d.code}</td>
              <td>{d.name}</td>
              <td>{d.shortName}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Sửa</button>
                <button onClick={() => handleDelete(d.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
