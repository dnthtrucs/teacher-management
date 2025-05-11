import React, { useState } from 'react';

const ThongTinNguoiDung = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, username: '', password: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    const maskedPassword = '*'.repeat(form.password.length);
    const newUser = { ...form, password: maskedPassword };

    if (isEdit) {
      setUsers(users.map((user) => (user.id === form.id ? newUser : user)));
      setIsEdit(false);
    } else {
      setUsers([...users, { ...newUser, id: Date.now() }]);
    }

    setForm({ id: null, username: '', password: '' });
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEdit(true);
  };

  const handleDelete = () => {
    if (form.id === null) {
      alert('Vui lòng chọn tài khoản cần xóa.');
      return;
    }

    if (window.confirm('Bạn có chắc muốn xóa tài khoản này?')) {
      setUsers(users.filter((user) => user.id !== form.id));
      setForm({ id: null, username: '', password: '' });
      setIsEdit(false);
    }
  };

  const handleRowClick = (index) => {
    setForm(users[index]);
    setIsEdit(true);
  };

  return (
    <div className="content">
      <h2>Quản lý thông tin người dùng</h2>

      {/* Form nhập thông tin người dùng */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      {/* Danh sách người dùng */}
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Mật khẩu (ẩn)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(index)}
              style={{ backgroundColor: form.id === user.id ? '#f0f8ff' : 'white' }}
            >
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete()}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThongTinNguoiDung;
