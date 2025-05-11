import React, { useState } from 'react';

export default function HeSoLuong() {
  const [heSoList, setHeSoList] = useState([]);
  const [form, setForm] = useState({
    id: null,
    ngach: '',
    bac: '',
    heSo: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleClearForm = () => {
    setForm({ id: null, ngach: '', bac: '', heSo: '' });
    setIsEdit(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { ngach, bac, heSo } = form;

    if (!ngach || !bac || !heSo) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!isEdit && heSoList.some(item => item.ngach === ngach && item.bac === bac)) {
      alert('Ngạch và bậc đã tồn tại.');
      return;
    }

    if (isEdit) {
      setHeSoList(
        heSoList.map(item => item.id === form.id ? form : item)
      );
    } else {
      setHeSoList([...heSoList, { ...form, id: Date.now() }]);
    }

    handleClearForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      setHeSoList(heSoList.filter(item => item.id !== id));
      handleClearForm();
    }
  };

  return (
    <div className="content">
      <h2>Quản lý hệ số lương giảng viên</h2>

      <form className="form" onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Ngạch"
          value={form.ngach}
          onChange={(e) => setForm({ ...form, ngach: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Bậc"
          value={form.bac}
          onChange={(e) => setForm({ ...form, bac: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Hệ số"
          value={form.heSo}
          onChange={(e) => setForm({ ...form, heSo: e.target.value })}
          required
        />
        <button type="submit">{isEdit ? 'Cập nhật' : 'Lưu'}</button>
        <button type="button" onClick={handleClearForm}>Thêm mới</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ngạch</th>
            <th>Bậc</th>
            <th>Hệ số</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {heSoList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.ngach}</td>
              <td>{item.bac}</td>
              <td>{item.heSo}</td>
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
