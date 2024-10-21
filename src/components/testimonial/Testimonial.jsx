import { useContext } from "react";
import myContext from "../../context/myContext";
import TestimonialCard from "./TestimonialCard"; 

const bgColor = {
  background: '#606368'
};

const Testimonial = () => {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h1 className="text-center text-3xl font-bold text-black" style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}>Testimonial</h1>
          <h2 className="text-center text-2xl font-semibold mb-10" style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}>
            What our <span className="text-pink-500">customers</span> are saying
          </h2>

          <div className="flex flex-wrap -m-4 gap-5 items-center justify-center">
            <TestimonialCard
              imgSrc="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              description="I had an amazing shopping experience! The products were exactly as described and arrived on time. The customer support was also very helpful."
              name="Himanshu"
              role="Verified Buyer"
              bgColor={bgColor}
              mode={mode}
            />
            <TestimonialCard
              imgSrc="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
              description="I’m very happy with my purchase. The checkout process was seamless, and I loved how fast the delivery was. I’ll definitely shop here again!"
              name="Shresht Sharma"
              role="Frequent Shopper"
              bgColor={bgColor}
              mode={mode}
            />
            <TestimonialCard
              imgSrc="https://cdn-icons-png.flaticon.com/512/236/236831.png"
              description="This is by far the best online store I’ve used. The variety of products, the user-friendly interface, and the prompt delivery are all top-notch."
              name="Mohit Gusain"
              role="Happy Customer"
              bgColor={bgColor}
              mode={mode}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
