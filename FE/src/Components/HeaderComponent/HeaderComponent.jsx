import React from 'react'
import {Badge, Col} from 'antd'
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { Link } from 'react-router-dom';
const HeaderComponent = () => {
  return (
    <WrapperHeader>
      <Col span={6}>
        <WrapperTextHeader>Cosmetic</WrapperTextHeader>
      </Col>
      <Col span={12}>
        <ButtonInputSearch
          size="large"
          placeholder="Search"
          textButton="Search"
        />
      </Col>
      <Col
        span={6}
        style={{ display: "flex", gap: "200px", alignItems: "center" }}
      >
        <WrapperHeaderAccount>
          <UserOutlined style={{ fontSize: "25px" }} />
          <div>
            <WrapperTextHeaderSmall>
              <Link to="/login">Login/</Link>
              <Link to="/signup">Signup</Link>
              </WrapperTextHeaderSmall>
            <div>
              <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
              <CaretDownOutlined />
            </div>
          </div>
        </WrapperHeaderAccount>
        <div>
          <Badge count={4} size='small'>
            <ShoppingCartOutlined style={{ fontSize: "25px", color: "#fff" }} />
          </Badge>
          <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
        </div>
      </Col>
    </WrapperHeader>
  );
}

export default HeaderComponent