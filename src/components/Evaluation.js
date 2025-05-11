import React from 'react';

export default function Evaluation() {
  // Dữ liệu đánh giá mẫu
  const data = [
    { level: 'Xuất sắc', count: 3 },
    { level: 'Tốt', count: 5 },
    { level: 'Khá', count: 2 },
    { level: 'Trung bình', count: 1 },
  ];

  return (
    <div className="content">
      <h2>Thống kê đánh giá giảng viên</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Mức đánh giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.level}</td>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
