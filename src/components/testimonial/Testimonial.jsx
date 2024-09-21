import { useContext } from "react"
import myContext from "../../context/myContext"
const bgColor={
    background: '#606368'
}
const Testimonial = () => {
    const context=useContext(myContext);
    const {mode}=context;
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                
                <div className="container px-5 py-10 mx-auto">
                    
                    <h1 className=' text-center text-3xl font-bold text-black' style={mode==='dark'?{color:'white'}:{color:'gray'}} >Testimonial</h1>
                    
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={mode==='dark'?{color:'white'}:{color:'gray'}}>What our <span className=' text-pink-500'>customers</span> are saying</h2>

                    <div className="flex flex-wrap -m-4 gap-5 items-center justify-center">
                        
                        <div className="lg:w-1/4 lg:mb-0 mb-6 p-4 rounded-2xl hover:scale-105 transition-all hover:duration-300" style={mode==='dark'?bgColor:{background:'transparent'}}>
                            <div className="h-full text-center" >
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn.vectorstock.com/i/1000v/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" />
                                <p className="leading-relaxed" style={mode==='dark'?{color:'white'}:{color:'gray'}} >Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={mode==='dark'?{color:'white'}:{color:'gray'}}>Himanshu</h2>
                                <p className="text-gray-500" style={mode==='dark'?{color:'white'}:{color:'gray'}}>Senior Product Designer</p>
                            </div>
                        </div>

                       
                        <div className="lg:w-1/4 lg:mb-0 mb-6 p-4 rounded-2xl hover:scale-105 transition-all hover:duration-300" style={mode==='dark'?bgColor:{background:'transparent'}}>
                            <div className="h-full text-center" >
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://www.devknus.com/img/gawri.png" />
                                <p className="leading-relaxed" style={mode==='dark'?{color:'white'}:{color:'gray'}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={mode==='dark'?{color:'white'}:{color:'gray'}}>S Mishra</h2>
                                <p className="text-gray-500" style={mode==='dark'?{color:'white'}:{color:'gray'}}>UI Developer</p>
                            </div>
                        </div>

                        
                        <div className="lg:w-1/4 lg:mb-0 p-4 rounded-2xl hover:scale-105 transition-all hover:duration-300" style={mode==='dark'?bgColor:{background:'transparent'}}>
                            <div className="h-full text-center" >
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn-icons-png.flaticon.com/512/21/21104.png" />
                                <p className="leading-relaxed" style={mode==='dark'?{color:'white'}:{color:'gray'}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={mode==='dark'?{color:'white'}:{color:'gray'}}>XYZ </h2>
                                <p className="text-gray-500" style={mode==='dark'?{color:'white'}:{color:'gray'}}>CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial