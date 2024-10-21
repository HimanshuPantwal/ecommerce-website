const TestimonialCard = ({ imgSrc, description, name, role, bgColor, mode }) => {
    return (
      <div
        className="lg:w-1/4 lg:mb-0 mb-6 p-4 rounded-2xl hover:scale-105 transition-all hover:duration-300 h-[25rem]"
        style={mode === 'dark' ? bgColor : { background: 'transparent' }}
      >
        <div className="h-full text-center">
          <img
            alt="testimonial"
            className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
            src={imgSrc}
          />
          <p className="leading-relaxed" style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}>
            {description}
          </p>
          <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}>
            {name}
          </h2>
          <p className="text-gray-500" style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}>{role}</p>
        </div>
      </div>
    );
  };

export default TestimonialCard;