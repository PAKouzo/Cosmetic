import React from "react";
import NavbarComponent from "../../Components/NavbarComponent/NavbarComponent";
import CardComponent from "../../Components/CardComponent/CardComponent";
import { Row, Col } from "antd";
import "./style.scss";
import { Pagination } from "antd";

const TypeProductPage = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <Row className="type-container">
      <Col span={4} className="navbar-item">
        <NavbarComponent />
      </Col>
      <Col span={20} className="card-container">
        <div className="card-item">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <div className="pagination-container">
          <Pagination
            showQuickJumper
            defaultCurrent={2}
            total={500}
            onChange={onChange}
          />
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default TypeProductPage;
