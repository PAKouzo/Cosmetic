import React from 'react'
import './style.scss'
import ProductComponent from '../../Components/ProductComponent/ProductComponent'

const ProductDetailPage = () => {
  return (
    <div className="productdetail-container">
      <h1>Trang chủ</h1>
      <div>
        <ProductComponent />
      </div>
    </div>
  );
}

export default ProductDetailPage