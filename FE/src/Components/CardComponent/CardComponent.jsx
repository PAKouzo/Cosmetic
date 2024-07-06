import React from "react";
import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";

import "./style.scss";

const CardComponent = () => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      // bodyStyle={{ padding: "10px" }}
      // headStyle={{ width: "200px", height: "200px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <div className="name">Kem dưỡng ẩm</div>
      <div className="rate">
        <span>
          <span>3.7</span>
          <StarOutlined style={{ fontSize: "10px", color: "blue" }} />
        </span>
        <span> | Đã bán 1000+</span>
      </div>
      <div className="price">
        100.000đ
        <span className="discount"> -20%</span>
      </div>
    </Card>
  );
};

export default CardComponent;
