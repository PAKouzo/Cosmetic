import React from 'react'
import Slider from 'react-slick'
import { Image } from 'antd';
const SliderComponent = ({arr}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
  return (
    <Slider {...settings}>
        {arr.map((image)=>{
            return <Image key={image} src={image} alt="slider" preview={false} width="100%" height="500px" />;
        })}
    </Slider>
  )
}

export default SliderComponent