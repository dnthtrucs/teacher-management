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
import TienTheoTiet from './tientheotiet';
import Hesogiaovien from './hesogiaovien';
import Hesolop from './hesolop';
import Tinhtienday from './tinhtienday';
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
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', backgroundColor: '#001529', color: '#fff' }}>
        <Sidebar onNavigate={setPage} />
      </div>
      <div style={{ flex: 1, backgroundColor: '#f0f2f5', padding: '24px', overflowY: 'auto' }}>
        {page === 'teacher' && <Teacher />}
        {page === 'teaching' && <Teaching />}
        {page === 'semester' && <Semester />}
        {page === 'class' && <Class />}
        {page === 'course' && <Course />}
        {page === 'quanlykhoa' && <Quanlykhoa />}
        {page === 'bangcap' && <Bangcap />}
        {page === 'evaluation' && <Evaluation />}
        {page === 'tientheotiet' && <TienTheoTiet />}
        {page === 'hesogiaovien' && <Hesogiaovien />}
        {page === 'hesolop' && <Hesolop />}
        {page === 'tinhtienday' && <Tinhtienday />}
        {page === 'thongtinnguoidung' && <ThongTinNguoiDung />}
        {page === 'ngach' && <NgachGiangVien />}
        {page === 'bac' && <BacGiangVien />}
        {page === 'trinhdo' && <TrinhDoGiangVien />}
        {page === 'hesoluong' && <HeSoLuong />}
        {page === 'luongtoithieu' && <LuongToiThieu />}
        {page === 'noidungdanhgia' && <NoiDungDanhGia />}
      </div>
    </div>
  );
}
