import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
    const navigate = useNavigate();

    // Product data for the slider
    const productData = [
        {
            category: 'shoes',
            image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
            offer: '10% off on Shoes'
        },
        {
            category: 'fashion',
            image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
            offer: '20% off on Fashion'
        },
        {
            category: 'mobile',
            image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
            offer: '5% off on Mobiles'
        },
        {
            category: 'laptop',
            image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
            offer: '15% off on Laptops'
        }
    ];

    // Slick slider settings
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
        <div className="w-full">
            <Slider {...settings}>
                {productData.map((item, index) => (
                    <div key={index} className="relative">
                        <img 
                            src={item.image} 
                            alt={item.category} 
                            className="w-full h-96 object-cover"
                        />
                        {/* Overlay for offer */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="text-center">
                                <h2 className="text-white text-3xl font-bold">{item.offer}</h2>
                                <button 
                                    onClick={() => navigate(`/category/${item.category}`)} 
                                    className="mt-5 bg-pink-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
