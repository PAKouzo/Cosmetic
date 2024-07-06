import React from 'react'
import TypeProduct from '../../Components/TypeProduct/TypeProduct'
import './style.scss'
import SliderComponent from '../../Components/SliderComponent/SliderComponent'
import slider1 from '../../assets/slider_1.webp'
import slider2 from "../../assets/slider_2.webp";
import slider3 from "../../assets/slider_3.webp";
import CardComponent from '../../Components/CardComponent/CardComponent'
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'

const HomePage = () => {
    const arr = ["Sữa rửa mặt", "Kem dưỡng ẩm", "Kem chống nắng"]
  return (
    <>
      <div className="homepage-container">
        <div className="list">
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </div>
      </div>
      <div className="slideShow">
        <SliderComponent arr={[slider1, slider2, slider3]} />
        <div className="card">
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
          <CardComponent />
          <CardComponent />
        </div>
        <div className='buttonComponent'>
          <ButtonComponent
            id="buttonComponent"
            type="outline"
            style={{}}
            text="Xem thêm"
          />
        </div>
      </div>
    </>
  );
}

export default HomePage