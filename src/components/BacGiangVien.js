import React, { useState } from 'react';

export default function BacGiangVien() {
  const [bacList, setBacList] = useState([]);
  const [form, setForm] = useState({ id: null, tenBac: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.tenBac.trim()) {
      alert('Vui lòng nhập tên bậc giảng viên.');
      return;
    }

    if (isEdit) {
      setBacList(bacList.map(b => b.id === form.id ? form : b));
      setIsEdit(false);
    } else {
      setBacList([...bacList, { ...form, id: Date.now() }]);
    }

    setForm({ id: null, tenBac: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      setBacList(bacList.filter(b => b.id !== id));
      setForm({ id: null, tenBac: '' });
      setIsEdit(false);
    }
  };

  return (
    <div className="content">
      <h2>Quản lý bậc giảng viên</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên bậc giảng viên"
          value={form.tenBac}
          onChange={(e) => setForm({ ...form, tenBac: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên bậc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bacList.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.tenBac}</td>
              <td>
                <button onClick={() => handleEdit(b)}>Sửa</button>
                <button onClick={() => handleDelete(b.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
