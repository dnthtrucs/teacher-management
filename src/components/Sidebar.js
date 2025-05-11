import React from 'react';

export default function Sidebar({ onNavigate }) {
  return (
    <div className="sidebar">
      <h3>Chức năng</h3>
      <ul>
        <li onClick={() => onNavigate('teacher')}>Giáo viên</li>
        <li onClick={() => onNavigate('teaching')}>Giảng dạy</li>
        <li onClick={() => onNavigate('semester')}>Học kỳ</li>
        <li onClick={() => onNavigate('class')}>Lớp học</li>
        <li onClick={() => onNavigate('course')}>Môn học</li>
        <li onClick={() => onNavigate('student')}>Sinh viên</li>
        <li onClick={() => onNavigate('evaluation')}>Thống kê</li>
        <li onClick={() => onNavigate('thongtinnguoidung')}>Thông tin người dùng</li>
        <li onClick={() => onNavigate('ngach')}>Ngạch giảng viên</li>
        <li onClick={() => onNavigate('bac')}>Bậc giảng viên</li>
        <li onClick={() => onNavigate('trinhdo')}>Trình độ giảng viên</li>
        <li onClick={() => onNavigate('hesoluong')}>Hệ số lương</li>
        <li onClick={() => onNavigate('luongtoithieu')}>Lương tối thiểu</li>
        <li onClick={() => onNavigate('noidungdanhgia')}>Nội dung đánh giá</li>
      </ul>
    </div>
  );
}
