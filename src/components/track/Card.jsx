const Card = ({ icon, title, description, mode }) => {
    const bgColor = {
      background: '#606368',
    };
  
    return (
      <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
        <div
          className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg flex flex-col items-center"
          style={mode === 'dark' ? bgColor : { background: 'white' }}
        >
          <img src={icon} className='size-[8rem] rounded-full'/>
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