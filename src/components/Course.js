import React, { useState, useEffect } from 'react';

export default function Course() {
  // Khởi tạo dữ liệu từ localStorage nếu có
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [
      { id: 1, name: 'Lập trình Web', code: 'WEB101' },
      { id: 2, name: 'Kế toán tài chính', code: 'FIN202' }
    ];
  });

  const [form, setForm] = useState({ id: null, name: '', code: '' });
  const [isEdit, setIsEdit] = useState(false);

  // Lưu dữ liệu courses vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setCourses(courses.map(c => c.id === form.id ? form : c));
      setIsEdit(false);
    } else {
      setCourses([...courses, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', code: '' });
  };

  const handleEdit = (course) => {
    setForm(course);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Quản lý môn học</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên môn học"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Mã môn học"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên môn học</th>
            <th>Mã môn học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td> {/* Số thứ tự tự động */}
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>
                <button onClick={() => handleEdit(course)}>Sửa</button>
                <button onClick={() => handleDelete(course.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
