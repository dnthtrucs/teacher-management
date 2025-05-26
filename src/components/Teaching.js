import React, { useState, useEffect } from 'react';

export default function Assignment() {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('assignments');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            teacher: 'Nguyễn Văn A',
            courseClass: 'Lập trình Web lớp 1',
            semester: 'HK1 - 2024-2025'
          }
        ];
  });

  const [form, setForm] = useState({
    id: null,
    teacher: '',
    courseClass: '',
    semester: ''
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setAssignments(assignments.map(a => (a.id === form.id ? form : a)));
      setIsEdit(false);
    } else {
      setAssignments([...assignments, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, teacher: '', courseClass: '', semester: '' });
  };

  const handleEdit = (a) => {
    setForm(a);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phân công này?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  return (
    <div className="content">
      <h2>Phân công giảng viên</h2>

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
          placeholder="Lớp học phần"
          value={form.courseClass}
          onChange={(e) => setForm({ ...form, courseClass: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Kỳ học"
          value={form.semester}
          onChange={(e) => setForm({ ...form, semester: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Giảng viên</th>
            <th>Lớp học phần</th>
            <th>Kỳ học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.teacher}</td>
              <td>{a.courseClass}</td>
              <td>{a.semester}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Sửa</button>
                <button onClick={() => handleDelete(a.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
