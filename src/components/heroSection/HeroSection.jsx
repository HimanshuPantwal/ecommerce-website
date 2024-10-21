import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const PrevArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-lg size-[2rem] text-center z-10`}
            style={{ ...style, display: "block", left: "-20px" }} 
            onClick={onClick}
        >
        </div>
    );
};


const NextArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} bg-pink-500 hover:bg-pink-600 rounded-full p-2 shadow-lg size-[2rem] text-center `}
            style={{ ...style, display: "block", right: "-20px" }} 
            onClick={onClick}
        >
        </div>
    );
};

const HeroSlider = () => {
    const navigate = useNavigate();

    
    const sliderItems = [
        {
            category: "mobile",
            image: "https://img.freepik.com/free-vector/silver-smartphone_23-2147694815.jpg?t=st=1729498127~exp=1729501727~hmac=6ac3958b20b17505e4612b085f0537ed899c15b0a4bb56e3b0f0396753bcd7b6&w=740",
            offer: "Up to 30% OFF on Mobiles",
        },
        {
            category: "laptop",
            image: "https://img.freepik.com/free-photo/female-hand-typing-keyboard-laptop_1150-15742.jpg?t=st=1729498087~exp=1729501687~hmac=19f3b13c345927a67d9727b53c4c6484fcf6c8861f7d26ccaa526fee58420f3d&w=996",
            offer: "Flat 40% OFF on Laptops",
        },
        {
            category: "jacket",
            image: "https://img.freepik.com/free-photo/young-man-with-beard-putting-hood-his-stylish-red-grey-anorack-isolated-white_346278-948.jpg?w=996&t=st=1729498004~exp=1729498604~hmac=c518e3b52a626c9060a3f4b280c88586322d9c9920a8795a276d92b8aa93eb45",
            offer: "20% OFF on Jackets",
        },
        {
            category: "home",
            image: "https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?t=st=1729498051~exp=1729501651~hmac=ddcd1d876b150cf57dd2bd6592ecb558e7f6a4054247015e136cf8eea2446d8c&w=1060",
            offer: "Up to 10% OFF on Home Appliances",
        },
    ];

    
    const settings = {
        dots: true,             // Show dots below the slider
        infinite: true,         // Infinite loop sliding
        speed: 500,             // Slide transition speed
        slidesToShow: 1,        // Show one slide at a time
        slidesToScroll: 1,      // Scroll one slide at a time
        autoplay: true,         // Auto slide
        autoplaySpeed: 3000,    // Slide every 3 seconds
        arrows: true,           // Enable custom arrows
        prevArrow: <PrevArrow />, // Custom previous arrow
        nextArrow: <NextArrow />, // Custom next arrow
    };

    return (
        <div className="relative mx-10 max-w-7xl px-4 my-2">
            <Slider {...settings}>
                {sliderItems.map((item, index) => (
                    <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full h-64 lg:h-96 relative flex items-center justify-center overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.category}
                                className="object-contain max-h-64 lg:max-h-96 mx-auto"
                            />
                        </div>
                       
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-4">
                            <h2 className="text-white text-2xl lg:text-4xl font-bold mb-2">
                                {item.offer}
                            </h2>
                            <button
                                onClick={() => navigate(`/category/${item.category}`)}
                                className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
