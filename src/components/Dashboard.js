import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Teacher from './Teacher';
import Teaching from './Teaching';
import Semester from './Semester';
import Class from './Class';
import Course from './Course';
import Quanlykhoa from './Quanlykhoa';
import Bangcap from './Bangcap';
import Evaluation from './Evaluation';
import ThongTinNguoiDung from './ThongTinNguoiDung';
import NgachGiangVien from './NgachGiangVien';
import BacGiangVien from './BacGiangVien';
import TrinhDoGiangVien from './TrinhDoGiangVien';
import HeSoLuong from './HeSoLuong';
import LuongToiThieu from './LuongToiThieu';
import NoiDungDanhGia from './NoiDungDanhGia';

export default function Dashboard() {
  const [page, setPage] = useState('teacher');

  return (
    <div className="container">
      <Sidebar onNavigate={setPage} />
      {page === 'teacher' && <Teacher />}
      {page === 'teaching' && <Teaching />}
      {page === 'semester' && <Semester />}
      {page === 'class' && <Class />}
      {page === 'course' && <Course />}
      {page === 'quanlykhoa' && <Quanlykhoa />}
      {page === 'bangcap' && <Bangcap />}
      {page === 'evaluation' && <Evaluation />}
      {page === 'thongtinnguoidung' && <ThongTinNguoiDung />}
      {page === 'ngach' && <NgachGiangVien />}
      {page === 'bac' && <BacGiangVien />}
      {page === 'trinhdo' && <TrinhDoGiangVien />}
      {page === 'hesoluong' && <HeSoLuong />}
      {page === 'luongtoithieu' && <LuongToiThieu />}
      {page === 'noidungdanhgia' && <NoiDungDanhGia />}
    </div>
  );
}
