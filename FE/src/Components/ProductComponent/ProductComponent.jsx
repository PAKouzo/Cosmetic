import React from "react";
import "./style.scss";
import { Col, Image, Row, InputNumber } from "antd";
import product1 from "../../assets/product1.webp";
import smallImage1 from "../../assets/imageSmallProduct1.webp";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ProductComponent = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <Row className="product-container">
      <Col span={10}>
        <Image src={product1} alt="Image" />
        <Row className="product-item-container">
          <Col className="product-item" span={4}>
            <Image
              className="small-image-item"
              src={smallImage1}
              alt="Image small"
              preview="false"
            />
          </Col>
          <Col className="product-item" span={4}>
            <Image
              className="small-image-item"
              src={smallImage1}
              alt="Image small"
              preview="false"
            />
          </Col>
          <Col className="product-item" span={4}>
            <Image
              className="small-image-item"
              src={smallImage1}
              alt="Image small"
              preview="false"
            />
          </Col>
          <Col className="product-item" span={4}>
            <Image
              className="small-image-item"
              src={smallImage1}
              alt="Image small"
              preview="false"
            />
          </Col>
          <Col className="product-item" span={4}>
            <Image
              className="small-image-item"
              src={smallImage1}
              alt="Image small"
              preview="false"
            />
          </Col>
          <Col className="product-item" span={4}>
            <Image
              className="small-image-item"
              src={smallImage1}
              alt="Image small"
              preview="false"
            />
          </Col>
        </Row>
      </Col>
      <Col className="details-container" span={14}>
        <div className="title-detail">
          Cotoneve Combo 2 Bông tẩy trang may viền dập nổi AQUA LIFE CT002 + BTT
          CT001 (70m) (IP02) - mới
        </div>
        <div className="price-detail">120.000đ</div>
        <div className="add-detail">
          Giao đến:
          <span className="delivery-address"> Hà Nội</span>
          <span className="change-address"> - Đổi địa chỉ</span>
        </div>
        <div className="number-detail">
          <span className="change-number">Số lượng</span>
          <div className="number-button">
            <button className="MinusOutlined">
              <MinusOutlined />
            </button>
            <span>
              <InputNumber
                min={1}
                defaultValue={1}
                onChange={onChange}
                changeOnWheel
                size="small"
                style={{
                  width: "40px",
                  borderRadius: "0",
                  border: "1px solid #ccc",
                }}
              />
            </span>
            <button className="PlusOutlined">{<PlusOutlined />}</button>
          </div>
        </div>
        <div className="purchase">
          <div>
            <ButtonComponent
              text="Chọn mua"
              style={{ background: "red", width: "120px", height: "40px" }}
            />
          </div>
          <div>
            <ButtonComponent
              text="Mua trả sau"
              style={{
                background: "white",
                width: "120px",
                height: "40px",
                border: "1px solid blue",
                color: "black",
              }}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductComponent;
