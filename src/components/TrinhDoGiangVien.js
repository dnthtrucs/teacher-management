import React, { useState } from 'react';

export default function TrinhDoGiangVien() {
  const [trinhDoList, setTrinhDoList] = useState([]);
  const [form, setForm] = useState({
    id: null,
    maTrinhDo: '',
    tenTrinhDo: '',
    donGiaTiet: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleClearForm = () => {
    setForm({ id: null, maTrinhDo: '', tenTrinhDo: '', donGiaTiet: '' });
    setIsEdit(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { maTrinhDo, tenTrinhDo, donGiaTiet } = form;

    if (!maTrinhDo || !tenTrinhDo || !donGiaTiet) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!isEdit && trinhDoList.some(item => item.maTrinhDo === maTrinhDo)) {
      alert('Mã trình độ đã tồn tại.');
      return;
    }

    if (isEdit) {
      setTrinhDoList(
        trinhDoList.map(item => item.id === form.id ? form : item)
      );
    } else {
      setTrinhDoList([...trinhDoList, { ...form, id: Date.now() }]);
    }

    handleClearForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      setTrinhDoList(trinhDoList.filter(item => item.id !== id));
      handleClearForm();
    }
  };

  return (
    <div className="content">
      <h2>Quản lý trình độ giảng viên</h2>

      <form className="form" onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Mã trình độ"
          value={form.maTrinhDo}
          onChange={(e) => setForm({ ...form, maTrinhDo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tên trình độ"
          value={form.tenTrinhDo}
          onChange={(e) => setForm({ ...form, tenTrinhDo: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Đơn giá tiết"
          value={form.donGiaTiet}
          onChange={(e) => setForm({ ...form, donGiaTiet: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Lưu'}</button>
        <button type="button" onClick={handleClearForm}>Thêm mới</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã trình độ</th>
            <th>Tên trình độ</th>
            <th>Đơn giá tiết</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {trinhDoList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.maTrinhDo}</td>
              <td>{item.tenTrinhDo}</td>
              <td>{item.donGiaTiet}</td>
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
