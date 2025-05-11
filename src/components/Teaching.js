import React, { useState, useEffect } from 'react';

export default function Teaching() {
  // Khởi tạo dữ liệu từ localStorage nếu có
  const [teachings, setTeachings] = useState(() => {
    const savedTeachings = localStorage.getItem('teachings');
    return savedTeachings ? JSON.parse(savedTeachings) : [
      { id: 1, teacher: 'Nguyễn Văn A', course: 'Lập trình Web', className: 'CNTT1' },
      { id: 2, teacher: 'Trần Thị B', course: 'Kinh tế học', className: 'KT2' }
    ];
  });

  const [form, setForm] = useState({ id: null, teacher: '', course: '', className: '' });
  const [isEdit, setIsEdit] = useState(false);

  // Lưu dữ liệu teachings vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('teachings', JSON.stringify(teachings));
  }, [teachings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setTeachings(teachings.map(t => t.id === form.id ? form : t));
      setIsEdit(false);
    } else {
      setTeachings([...teachings, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, teacher: '', course: '', className: '' });
  };

  const handleEdit = (teaching) => {
    setForm(teaching);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setTeachings(teachings.filter(t => t.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý giảng dạy</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên giảng viên"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Môn học"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
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
            <th>STT</th>
            <th>Giảng viên</th>
            <th>Môn học</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachings.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td> {/* Số thứ tự */}
              <td>{t.teacher}</td>
              <td>{t.course}</td>
              <td>{t.className}</td>
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
