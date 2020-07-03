import React from 'react';
import './App.css';

import Header from "./components/Header/Header";
import Slide from "./components/Slide/Slide";
import DB from "./DB.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

function App() {
   
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  try{
  return (
    <div className="Carousel">
      <Header />
      <Slider {...settings}>
        {DB.slides.map((slide, index) =>
          <Slide
            key={index}
            src={slide.picture}
            content={slide.content}
          />
        )}
      </Slider>
      
    </div>
  )
} catch {}
}

   
export default App;
