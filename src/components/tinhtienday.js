import React, { useState } from "react";
import { Form, InputNumber, Typography, Row, Col, Card } from "antd";

const { Title } = Typography;

const TinhTienDay = () => {
  const [formValues, setFormValues] = useState({
    tiet: 0,
    heSoHocPhan: 1.0,
    siSo: 0,
    heSoGV: 1.3,
    dinhMuc: 50000,
  });

  const getHeSoLop = (siSo) => {
    if (siSo < 20) return -0.3;
    if (siSo < 30) return -0.2;
    if (siSo < 40) return -0.1;
    if (siSo < 50) return 0;
    if (siSo < 60) return 0.1;
    if (siSo < 70) return 0.2;
    return 0.3;
  };

  const tinhTien = () => {
    const { tiet, heSoHocPhan, siSo, heSoGV, dinhMuc } = formValues;
    const hsLop = getHeSoLop(parseInt(siSo));
    const tietQD = tiet * (parseFloat(heSoHocPhan) + hsLop);
    const tien = tietQD * heSoGV * dinhMuc;
    return isNaN(tien) ? 0 : tien;
  };

  const handleChange = (changedValues) => {
    setFormValues((prev) => ({ ...prev, ...changedValues }));
  };

  return (
    <Card title="Tính tiền dạy" style={{ maxWidth: 800, margin: "auto" }}>
      <Form
        layout="vertical"
        initialValues={formValues}
        onValuesChange={(_, allValues) => handleChange(allValues)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Số tiết thực tế" name="tiet" rules={[{ required: true }]}>
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Hệ số học phần" name="heSoHocPhan">
              <InputNumber min={0} step={0.1} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Hệ số lớp" name="heSoLop">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Hệ số giáo viên" name="heSoGV">
              <InputNumber min={0} step={0.1} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tiền mỗi tiết (đồng)" name="dinhMuc">
              <InputNumber min={0} step={1000} className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="mt-4">
        <Title level={4}>
          Tổng tiền dạy: {tinhTien().toLocaleString()} VNĐ
        </Title>
      </div>
    </Card>
  );
};

export default TinhTienDay;
