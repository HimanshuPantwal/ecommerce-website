import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import TestimonialCard from "./TestimonialCard";
import AOS from 'aos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bgColor = {
  background: '#606368'
};

const Testimonial = () => {
  const context = useContext(myContext);
  const { mode } = context;

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h2 className="text-center text-[2.5rem] font-semibold mb-10" style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}>
            What our <span className="text-pink-500">customers</span> are saying
          </h2>
          <Slider {...settings} className="testimonial-slider">
            <div data-aos='fade-up' className="mx-2">
              <TestimonialCard
                imgSrc="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                description="I had an amazing shopping experience! The products were exactly as described and arrived on time. The customer support was also very helpful."
                name="Himanshu"
                role="Verified Buyer"
                bgColor={bgColor}
                mode={mode}
              />
            </div>
            <div data-aos='fade-up' className="mx-2">
              <TestimonialCard
                imgSrc="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
                description="I’m very happy with my purchase. The checkout process was seamless, and I loved how fast the delivery was. I’ll definitely shop here again!"
                name="Shresht Sharma"
                role="Frequent Shopper"
                bgColor={bgColor}
                mode={mode}
              />
            </div>
            <div data-aos='fade-up' className="mx-2">
              <TestimonialCard
                imgSrc="https://cdn-icons-png.flaticon.com/512/236/236831.png"
                description="This is by far the best online store I’ve used. The variety of products, the user-friendly interface, and the prompt delivery are all top-notch."
                name="Mohit Gusain"
                role="Happy Customer"
                bgColor={bgColor}
                mode={mode}
              />
            </div>
            <div data-aos='fade-up' className="mx-2">
              <TestimonialCard
                imgSrc="https://cdn-icons-png.flaticon.com/512/3011/3011270.png"
                description="I was skeptical at first, but the quality and service won me over. Great products and seamless shopping experience."
                name="Priya Kapoor"
                role="Satisfied Buyer"
                bgColor={bgColor}
                mode={mode}
              />
            </div>
            <div data-aos='fade-up' className="mx-2">
              <TestimonialCard
                imgSrc="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                description="Quick delivery and exactly as shown. The site is well-organized, making it easy to find what I want."
                name="Rahul Verma"
                role="Regular Shopper"
                bgColor={bgColor}
                mode={mode}
              />
            </div>
            <div data-aos='fade-up' className="mx-2">
              <TestimonialCard
                imgSrc="https://cdn-icons-png.flaticon.com/512/236/236832.png"
                description="A delightful shopping experience! The service was excellent, and I got exactly what I wanted."
                name="Sneha Patil"
                role="Happy Customer"
                bgColor={bgColor}
                mode={mode}
              />
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
