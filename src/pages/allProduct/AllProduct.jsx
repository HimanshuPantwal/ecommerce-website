import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import "aos/dist/aos.css"; // Importing AOS animation library
import AOS from "aos"; // For animation on scroll

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct, mode, isLoggedIn } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        // Initialize AOS animation
        AOS.init({ duration: 800 });
    }, []);

    return (
        <Layout>
            <div
                className="py-8"
                style={mode === "dark" ? { backgroundColor: "#1F1F1F" } : {}}
            >
                <div>
                    <h1 className="text-center mb-5 text-2xl font-semibold"
                        style={mode === "dark" ? { color: "white" } : { color: "black" }}>
                        All Products
                    </h1>
                </div>

                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {getAllProduct.map((item, index) => {
                                const { id, title, price, productImageUrl } = item;
                                return (
                                    <div
                                        key={index}
                                        className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                                        data-aos="fade-up"
                                    >
                                        <div
                                            className={`h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`}
                                            style={mode === "dark" ? { backgroundColor: "#282c34" } : {}}
                                        >
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-80 h-96 w-full object-cover transition-transform duration-300 transform hover:scale-110"
                                                src={productImageUrl}
                                                alt="img"
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium mb-1"
                                                    style={mode === "dark" ? { color: "white" } : { color: "gray-400" }}>
                                                    E-commerce
                                                </h2>
                                                <h1 className="title-font text-lg font-medium mb-3 truncate"
                                                    style={mode === "dark" ? { color: "white" } : { color: "black" }}>
                                                    {title}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium mb-3"
                                                    style={mode === "dark" ? { color: "white" } : { color: "black" }}>
                                                    ₹{price}
                                                </h1>

                                                <div className="flex justify-center mt-4">
                                                    {cartItems.some((p) => p.id === item.id) ? (
                                                        <button
                                                            onClick={isLoggedIn ? () => deleteCart(item) : () => {}}
                                                            className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold transition-colors duration-300"
                                                        >
                                                            Delete From Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={isLoggedIn ? () => addCart(item) : () => {}}
                                                            className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold transition-colors duration-300"
                                                        >
                                                            Add To Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
