import React from 'react'
import { Button } from "antd";

const ButtonComponent = ({size, color, backgroudColor, text, ...rests}) => {
  return (
    <Button
      size={size}
      type="primary"
      style={{color: {color}, backgroundColor: {backgroudColor}}}
      {...rests}
    >
      <span>{text}</span>
    </Button>
  );
};

export default ButtonComponent