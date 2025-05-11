import React, { useState } from 'react';

const LuongToiThieu = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ id: null, soTien: '', ngayApDung: '' });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.soTien || !form.ngayApDung) {
      alert('Vui lòng nhập đầy đủ!');
      return;
    }

    const item = { ...form };

    if (isEdit) {
      setList(list.map((val) => (val.id === form.id ? item : val)));
      setIsEdit(false);
    } else {
      setList([...list, { ...item, id: Date.now() }]);
    }

    setForm({ id: null, soTien: '', ngayApDung: '' });
  };

  const handleEdit = (index) => {
    const item = list[index];
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      const updated = list.filter((_, i) => i !== index);
      setList(updated);
      setForm({ id: null, soTien: '', ngayApDung: '' });
      setIsEdit(false);
    }
  };

  return (
    <div className="content">
      <h2>Quản lý lương tối thiểu</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
            type="number"
            className="form-control"
            placeholder="Số tiền"
            value={form.soTien}
            onChange={(e) => setForm({ ...form, soTien: e.target.value })}
            required
        />
        <input
          type="date"
          className="form-control"
          value={form.ngayApDung}
          onChange={(e) => setForm({ ...form, ngayApDung: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Số tiền</th>
            <th>Ngày áp dụng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">Không có dữ liệu</td>
            </tr>
          ) : (
            list.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{parseInt(item.soTien).toLocaleString()} VND</td>
                <td>{item.ngayApDung}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Sửa</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LuongToiThieu;
