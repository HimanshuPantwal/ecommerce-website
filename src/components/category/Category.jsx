import { useNavigate } from "react-router";
import { useEffect } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useRef } from "react";
import myContext from "../../context/myContext";
import { useContext } from "react";
import MyState from "../../context/myState";
const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
        name: 'fashion'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
        name: 'shirt'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
        name: 'jacket'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'mobile'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
        name: 'laptop'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
        name: 'home'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
        name: 'books'
    }
]

const Category = () => {
    const navigate=useNavigate();
    const scrollContainerRef = useRef(null);
    const context=useContext(myContext);
    const {mode}=context;
    
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 200; 
        }
    };

    
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 200;
        }
    };
    const bgColor={
        background: '#085078',
        background: '-webkit-linear-gradient(to right, #85D8CE, #085078)',
        background: 'linear-gradient(to right, #85D8CE, #085078)'
    }
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleWheel = (event) => {
            if (scrollContainer) {
                event.preventDefault();
                scrollContainer.scrollLeft += event.deltaY; 
            }
        };

        scrollContainer.addEventListener("wheel", handleWheel);

        return () => {
            scrollContainer.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div className="relative w-full flex justify-center items-center" style={mode==='light'?{backgroundColor:'white'}:{backgroundColor:'rgb(40, 44, 52)'}}>
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-[48%] transform -translate-y-1/2 bg-transparent border-none cursor-pointer z-10 m-1"
            >
                <CiCircleChevLeft size={30} style={mode==='light'?{color:'black'}:{color:'white'}} />
            </button>
            <div
                ref={scrollContainerRef}
                style={{
                    scrollBehavior: "smooth",
                    overflow:"hidden"
                }}
                className='flex overflow-x-auto whitespace-nowrap w-[100%] h-[200px] scroll-p-left-[10px] border-[#ccc] border-1 border-solid hide-scroll-bar'
            >
                <div className="flex items-center hide-scroll-bar w-full">
                    {category.map((item, index) => {
                        return (
                            <div key={index} className="px-3 lg:px-10 hover:scale-105 transition-all duration-300 w-full">
                                 {console.log(item.name)}
                                <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full transition-all cursor-pointer mb-1 hover:rotate-[360deg] duration-1000">
                                    <div className="flex justify-center mb-12" style={mode==='dark'?{...bgColor,borderRadius:'100%'}:{background:'pink',borderRadius:'100%'}} >

                                        <img src={item.image} alt="img" />
                                    </div>
                                </div>
                                <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase ' style={mode==='light'?{color:'black'}:{color:'white'}}>{item.name}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>

            <button
                onClick={scrollRight}
                className="absolute right-0 top-[48%] transform -translate-y-1/2 bg-transparent border-none cursor-pointer z-10 m-1"
            >
                <CiCircleChevRight size={30} style={mode==='light'?{color:'black'}:{color:'white'}}/>
            </button>
        </div>
    );
};

export default Category;