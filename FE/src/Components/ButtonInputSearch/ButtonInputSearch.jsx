import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SearchOutlined } from "@ant-design/icons";

const ButtonInputSearch = (props) => {
  const { 
    size, 
    placeholder, 
    textButton, 
    backgroundColorInput = '#fff', 
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff'
    } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent />
      <ButtonComponent size="large" text="Search" icon={<SearchOutlined />} />
    </div>
  );
};

export default ButtonInputSearch;
