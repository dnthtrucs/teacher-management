import React, { useState, useEffect } from 'react';

export default function Class() {
  // Khởi tạo dữ liệu từ localStorage nếu có
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem('classes');
    return savedClasses ? JSON.parse(savedClasses) : [
      { id: 1, name: 'CNTT1', major: 'Công nghệ thông tin' },
      { id: 2, name: 'KT1', major: 'Kế toán' }
    ];
  });

  const [form, setForm] = useState({ id: null, name: '', major: '' });
  const [isEdit, setIsEdit] = useState(false);

  // Lưu dữ liệu classes vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

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
            <th>STT</th>
            <th>Tên lớp</th>
            <th>Ngành học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td> {/* Số thứ tự tự động */}
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
