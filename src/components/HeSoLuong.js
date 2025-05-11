import React, { useState, useEffect } from 'react';

export default function HeSoLuong() {
  const [heSoList, setHeSoList] = useState([]);
  const [form, setForm] = useState({
    id: null,
    ngach: '',
    bac: '',
    heSo: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  // Lấy dữ liệu từ localStorage khi component được render
  useEffect(() => {
    const storedHeSoList = JSON.parse(localStorage.getItem('heSoList'));
    if (storedHeSoList) {
      setHeSoList(storedHeSoList);
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi heSoList thay đổi
  useEffect(() => {
    if (heSoList.length > 0) {
      localStorage.setItem('heSoList', JSON.stringify(heSoList));
    }
  }, [heSoList]);

  const handleClearForm = () => {
    setForm({ id: null, ngach: '', bac: '', heSo: '' });
    setIsEdit(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { ngach, bac, heSo } = form;

    // Kiểm tra điều kiện nhập liệu
    if (!ngach.trim() || !bac.trim() || !heSo.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    // Kiểm tra xem ngạch và bậc đã tồn tại chưa
    if (!isEdit && heSoList.some(item => item.ngach === ngach && item.bac === bac)) {
      alert('Ngạch và bậc đã tồn tại.');
      return;
    }

    // Thêm mới hoặc cập nhật
    if (isEdit) {
      setHeSoList(
        heSoList.map(item => (item.id === form.id ? form : item))
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
      // Xóa khỏi state
      const updatedList = heSoList.filter(item => item.id !== id);
      setHeSoList(updatedList);

      // Cập nhật lại localStorage sau khi xóa
      localStorage.setItem('heSoList', JSON.stringify(updatedList));

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
