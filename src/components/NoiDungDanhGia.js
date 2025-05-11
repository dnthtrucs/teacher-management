import React, { useState } from 'react';

const NoiDungDanhGia = () => {
  const [danhGiaList, setDanhGiaList] = useState([]);
  const [form, setForm] = useState({ id: null, noiDung: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.noiDung.trim()) {
      alert('Vui lòng nhập nội dung đánh giá.');
      return;
    }

    if (isEdit) {
      setDanhGiaList(danhGiaList.map((item) => (item.id === form.id ? form : item)));
      setIsEdit(false);
    } else {
      setDanhGiaList([...danhGiaList, { ...form, id: Date.now() }]);
    }

    setForm({ id: null, noiDung: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      setDanhGiaList(danhGiaList.filter((item) => item.id !== id));
      setForm({ id: null, noiDung: '' });
      setIsEdit(false);
    }
  };

  return (
    <div className="content">
      <h2>Quản lý nội dung đánh giá</h2>

      {/* Form nhập nội dung đánh giá */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nhập nội dung đánh giá"
          value={form.noiDung}
          onChange={(e) => setForm({ ...form, noiDung: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      {/* Danh sách nội dung đánh giá */}
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Nội dung đánh giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {danhGiaList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.noiDung}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Sửa</button>
                <button onClick={() => handleDelete(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoiDungDanhGia;
