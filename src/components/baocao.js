import React, { useState } from 'react';
import { Select, Table, Typography, Row, Col } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const sampleData = [
  { id: 1, teacher: 'Nguyễn Văn A', faculty: 'CNTT', year: 2024, amount: 15000000 },
  { id: 2, teacher: 'Trần Thị B', faculty: 'Kinh tế', year: 2024, amount: 12000000 },
  { id: 3, teacher: 'Nguyễn Văn A', faculty: 'CNTT', year: 2023, amount: 14000000 },
  { id: 4, teacher: 'Phạm Văn C', faculty: 'CNTT', year: 2024, amount: 13000000 },
];

export default function Baocao() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [faculty, setFaculty] = useState('');
  const [reportType, setReportType] = useState('year');

  const years = [...new Set(sampleData.map((item) => item.year))];
  const faculties = [...new Set(sampleData.map((item) => item.faculty))];

  const filteredData = sampleData.filter((item) => {
    if (reportType === 'year') return item.year === year;
    if (reportType === 'faculty') return item.year === year && item.faculty === faculty;
    return item.year === year; // For 'school' report
  });

  const total = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Báo cáo tiền dạy</Title>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select value={reportType} onChange={setReportType} style={{ width: 200 }}>
            <Option value="year">Theo giáo viên trong 1 năm</Option>
            <Option value="faculty">Theo giáo viên một khoa</Option>
            <Option value="school">Theo toàn trường</Option>
          </Select>
        </Col>
        <Col>
          <Select value={year} onChange={setYear} style={{ width: 120 }}>
            {years.map((y) => (
              <Option key={y} value={y}>
                {y}
              </Option>
            ))}
          </Select>
        </Col>
        {reportType === 'faculty' && (
          <Col>
            <Select
              value={faculty}
              onChange={setFaculty}
              placeholder="Chọn khoa"
              style={{ width: 160 }}
            >
              {faculties.map((f) => (
                <Option key={f} value={f}>
                  {f}
                </Option>
              ))}
            </Select>
          </Col>
        )}
      </Row>

      <Table
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
        bordered
        columns={[
          { title: 'Giáo viên', dataIndex: 'teacher' },
          { title: 'Khoa', dataIndex: 'faculty' },
          { title: 'Năm', dataIndex: 'year' },
          {
            title: 'Tiền dạy (VNĐ)',
            dataIndex: 'amount',
            render: (value) => value.toLocaleString(),
          },
        ]}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3} style={{ fontWeight: 'bold' }}>
              Tổng cộng
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} style={{ fontWeight: 'bold' }}>
              {total.toLocaleString()} VNĐ
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
}
