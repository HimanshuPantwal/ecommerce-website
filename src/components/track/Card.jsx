const Card = ({ icon, title, description, mode }) => {
    const bgColor = {
      background: '#606368',
    };
  
    return (
      <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
        <div
          className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
          style={mode === 'dark' ? bgColor : { background: 'white' }}
        >
          <svg
            className="text-pink-600 w-12 h-12 mb-3 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {icon}
          </svg>
          <h2
            className="title-font font-medium text-lg"
            style={mode === 'dark' ? { color: 'white' } : { color: 'gray' }}
          >
            {title}
          </h2>
          <p
            className="leading-relaxed"
            style={mode === 'dark' ? { color: 'white' } : { color: 'black' }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  };
export default Card;  