import React, { useState, useEffect } from 'react';

export default function NgachGiangVien() {
  const [ngachList, setNgachList] = useState([]);
  const [form, setForm] = useState({ id: null, tenNgach: '', he: '' });
  const [isEdit, setIsEdit] = useState(false);

  // Lấy dữ liệu từ localStorage khi component được render
  useEffect(() => {
    const storedNgachList = JSON.parse(localStorage.getItem('ngachGiangVienList'));
    if (storedNgachList) {
      setNgachList(storedNgachList);
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    if (ngachList.length > 0) {
      localStorage.setItem('ngachGiangVienList', JSON.stringify(ngachList));
    }
  }, [ngachList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.tenNgach.trim() || !form.he.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (isEdit) {
      setNgachList(ngachList.map(item => item.id === form.id ? form : item));
      setIsEdit(false);
    } else {
      setNgachList([...ngachList, { ...form, id: Date.now() }]);
    }

    setForm({ id: null, tenNgach: '', he: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      const updatedList = ngachList.filter(item => item.id !== id);
      setNgachList(updatedList);

      // Cập nhật localStorage sau khi xóa
      localStorage.setItem('ngachGiangVienList', JSON.stringify(updatedList));

      setForm({ id: null, tenNgach: '', he: '' });
      setIsEdit(false);
    }
  };

  return (
    <div className="content">
      <h2>Quản lý ngạch giảng viên</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên ngạch"
          value={form.tenNgach}
          onChange={(e) => setForm({ ...form, tenNgach: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Hệ (Trình độ)"
          value={form.he}
          onChange={(e) => setForm({ ...form, he: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên ngạch</th>
            <th>Hệ (Trình độ)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {ngachList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.tenNgach}</td>
              <td>{item.he}</td>
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
}
