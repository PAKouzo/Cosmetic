import React from "react";
import { Checkbox } from "antd";

import "./style.scss";
const NavbarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <h1 className="item">{option}</h1>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "price":
        return options.map((option) => {
          return <div className="price-navbar">{option}</div>;
        });
      default:
        return {};
    }
  };
  return (
    <div className="navbar-container">
      <div className="label">Label</div>
      <div className="item-list">
        {renderContent("text", ["Kem chống nắng", "Kem dưỡng ẩm"])}
      </div>
      <div className="item-list">
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ])}
      </div>
      <div className="item-list">
        {renderContent("price", ["Dưới 40", "Trên 500"])}
      </div>
    </div>
  );
};

export default NavbarComponent;
