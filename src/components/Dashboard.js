import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Teacher from './Teacher';
import Semester from './Semester';
import Class from './Class';
import Course from './Course';
import Quanlykhoa from './Quanlykhoa';
import Phancong from './phancong';
import Bangcap from './Bangcap';
import TienTheoTiet from './Tientheotiet';
import Hesogiaovien from './Hesogiaovien';
import Hesolop from './Hesolop';
import Tinhtienday from './Tinhtienday';
import Baocao from './baocao';
export default function Dashboard() {
  const [page, setPage] = useState('teacher');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', backgroundColor: '#001529', color: '#fff' }}>
        <Sidebar onNavigate={setPage} />
      </div>
      <div style={{ flex: 1, backgroundColor: '#f0f2f5', padding: '24px', overflowY: 'auto' }}>
        {page === 'teacher' && <Teacher />}
        {page === 'semester' && <Semester />}
        {page === 'class' && <Class />}
        {page === 'course' && <Course />}
        {page === 'quanlykhoa' && <Quanlykhoa />}
        {page === 'bangcap' && <Bangcap />}
        {page === 'phancong' && <Phancong />}
        {page === 'tientheotiet' && <TienTheoTiet />}
        {page === 'hesogiaovien' && <Hesogiaovien />}
        {page === 'hesolop' && <Hesolop />}
        {page === 'tinhtienday' && <Tinhtienday />}
        {page === 'baocao' && <Baocao />}
      </div>
    </div>
  );
}
