import React, { useState } from 'react';
import { Card, InputNumber, Typography } from 'antd';

const { Title, Text } = Typography;

export default function DinhMuc() {
  const [dinhMuc, setDinhMuc] = useState(50000);

  return (
    <Card title="Thiết lập định mức tiền/tiết" style={{ maxWidth: 600, margin: 'auto' }}>
      <div className="space-y-4">
        <div>
          <Text strong>Nhập định mức:</Text>
          <InputNumber
            value={dinhMuc}
            onChange={setDinhMuc}
            min={0}
            step={1000}
            className="w-full mt-2"
          />
        </div>
        <div>
          <Title level={5}>
            Tiền dạy mỗi tiết hiện tại: {dinhMuc.toLocaleString()} VNĐ
          </Title>
        </div>
      </div>
    </Card>
  );
}
