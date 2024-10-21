import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading, isLoggedIn, mode } = context; // Added mode for dark mode toggle

    const [product, setProduct] = useState('');
    const { id } = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct({ ...productTemp.data(), id: productTemp.id });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

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
        getProductData();
    }, []);

    return (
        <Layout>
            <section className={`py-5 lg:py-16 font-poppins ${mode === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="">
                                    <img
                                        className="w-full lg:h-[39em] rounded-lg"
                                        src={product?.productImageUrl}
                                        alt={product?.title}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6">
                                        <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide">
                                            {product?.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center mb-6">
                                            <ul className="flex mb-4 mr-2 lg:mb-0">
                                                {/* Add any custom star ratings logic here */}
                                                {/* Your SVG stars */}
                                            </ul>
                                        </div>
                                        <p className="inline-block text-2xl font-semibold">
                                            <span>₹ {product?.price}</span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold">Description :</h2>
                                        <p>{product?.description}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center mb-6">
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <button
                                                onClick={isLoggedIn ? () => deleteCart(product) : () => toast.error("Please Login or Sign up")}
                                                className="w-full px-4 py-3 text-center text-white bg-[#1e88e5] hover:bg-[#2297fe] border border--600 rounded-xl"
                                            >
                                                Delete from cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={isLoggedIn ? () => addCart(product) : () => toast.error("Please Login or Sign up")}
                                                className="w-full px-4 py-3 text-center text-white bg-[#1e88e5] hover:bg-[#2297fe] rounded-xl"
                                            >
                                                Add to cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
