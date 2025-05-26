import React, { useState } from 'react';

export default function Sidebar({ onNavigate }) {
  const [showTeacherSubmenu, setShowTeacherSubmenu] = useState(false);
  const [showClassSubmenu, setShowClassSubmenu] = useState(false);

  return (
    <div className="sidebar">
      <h3>Chức năng</h3>
      <ul>
        {/* Giáo viên + submenu */}
        <li
          onClick={() => setShowTeacherSubmenu(!showTeacherSubmenu)}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Quản Lý Giáo Viên {showTeacherSubmenu ? '▾' : '▸'}
        </li>
        {showTeacherSubmenu && (
          <ul style={{ paddingLeft: '15px' }}>
            <li onClick={() => onNavigate('bangcap')}>Quản lý danh mục bằng cấp</li>
            <li onClick={() => onNavigate('quanlykhoa')}>Quản lý khoa</li>
            <li onClick={() => onNavigate('teacher')}>Quản lý giáo viên</li>
          </ul>
        )}

        {/*Lớp Học Phần + submenu */}
        <li
          onClick={() => setShowClassSubmenu(!showClassSubmenu)}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Quản Lý Lớp Học Phần {showClassSubmenu ? '▾' : '▸'}
        </li>
        {showClassSubmenu && (
          <ul style={{ paddingLeft: '15px' }}>
            <li onClick={() => onNavigate('course')}>Quản lý học phần</li>
            <li onClick={() => onNavigate('semester')}>Quản lý kì học</li>
            <li onClick={() => onNavigate('class')}>Lớp học phần</li>
          </ul>
        )}
      </ul>
    </div>
  );
}

