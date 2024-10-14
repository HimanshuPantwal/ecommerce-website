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
            category: "mobiles",
            image: "https://media.istockphoto.com/id/1322157897/photo/close-up-of-a-businessman-hand-holding-a-smartphone-white-screen-is-blank-the-background-is.webp?s=1024x1024&w=is&k=20&c=hjLRm5BlNx86H-3dsn_KbuT2iRQL_FAgpdlFApNqEgM=",
            offer: "Up to 30% OFF on Mobiles",
        },
        {
            category: "laptop",
            image: "https://img.freepik.com/free-photo/person-using-laptop-with-coffee-wooden-table_9975-24434.jpg?t=st=1728900873~exp=1728904473~hmac=6cd93a5482132deb054c5d3fd0f0e506abb5b5f86faacc1c41a04c26095c9f07&w=1060",
            offer: "Flat 40% OFF on Laptops",
        },
        {
            category: "electronics",
            image: "https://images.unsplash.com/photo-1717295248230-93ea71f48f92?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            offer: "20% OFF on Electronics",
        },
        {
            category: "home-appliances",
            image: "https://media.istockphoto.com/id/1317490973/photo/modern-modular-kitchen-interior-range-cooker-and-chimney-hood.webp?s=1024x1024&w=is&k=20&c=kRS17UBXzyT4PebpL20G-7IJLZo5H9BuWHzil07i4wQ=",
            offer: "Up to 10% OFF on Home Appliances",
        },
    ];

    // React Slick settings
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
