import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState, useCallback, useRef } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout"
const categoryList = {
    fashion: ['clothes', 'apparel', 'mens', 'womens'],
    shirt: ['shirt', 't-shirt', 'top'],
    jacket: ['jacket', 'coat', 'blazer'],
    mobile: ['phone', 'mobile', 'smartphone'],
    laptop: ['laptop', 'notebook', 'macbook'],
    shoes: ['shoes', 'sneakers', 'boots'],
    home: ['furniture', 'appliance', 'decor'],
    books: ['book', 'novel', 'magazine']
};

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const [fetchingFromApi, setFetchingFromApi] = useState(false); 
    const [manualProduct, setManualProduct] = useState(true); 
    const [apiProductFetched, setApiProductFetched] = useState(false); 
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const randomNum = (end) => Math.floor(Math.random() * end) + 1;
    const countRef = useRef(randomNum(3));

    const addProductFunction = async () => {
        if (product.category === "") {
            return toast.error("Please choose a category");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Add product failed");
        }
    };

    const handleCategory = (ctg) => {
        for (let category in categoryList) {
            if (categoryList[category].some(keyword => ctg.toLowerCase().includes(keyword.toLowerCase()))) {
                return category;
            }
        }
        return '';
    };


    const fetchApi = useCallback(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products?page=${countRef.current}`)
            .then((res) => res.json())
            .then(json => {
                const pdt = json[randomNum(json.length - 1)];
                const category = handleCategory(pdt.category) || handleCategory(pdt.title);

                setProduct({
                    title: pdt.title,
                    price: pdt.price,
                    productImageUrl: pdt.image,
                    category: "",
                    description: pdt.description,
                    quantity: randomNum(100),
                    time: Timestamp.now(),
                    date: new Date().toLocaleString("en-US", {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric'
                    }),
                });
                setApiProductFetched(true); 
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div className='flex flex-col items-center my-[3rem] mx-2'>
                {loading && <Loader />}

                <div className="login_Form bg-white shadow-lg hover:shadow-xl transition-shadow px-8 py-6 border border-gray-200 rounded-xl w-full max-w-2xl">
                    <h2 className='text-center text-2xl font-extrabold text-blue-500 mb-5 transition-colors duration-200'>
                        Add Product
                    </h2>

                    
                    <div className="flex justify-around mb-5">
                        <button
                            className={`px-4 py-2 rounded-md transition-all duration-300 ${manualProduct ? 'bg-blue-500 text-white shadow-md hover:shadow-lg' : 'bg-gray-200'}`}
                            onClick={() => setManualProduct(true)}
                        >
                            Add Manually
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md transition-all duration-300 ${!manualProduct ? 'bg-blue-500 text-white shadow-md hover:shadow-lg' : 'bg-gray-200'}`}
                            onClick={() => setManualProduct(false)}
                        >
                            Fetch from API
                        </button>
                    </div>

                    
                    {manualProduct && (
                        <div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="title"
                                    value={product.title}
                                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                    placeholder='Product Title'
                                    className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all'
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                    placeholder='Product Price'
                                    className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all'
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="productImageUrl"
                                    value={product.productImageUrl}
                                    onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                                    placeholder='Product Image Url'
                                    className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all'
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    name="description"
                                    placeholder="Product Description"
                                    rows="5"
                                    className="bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                >
                                </textarea>
                            </div>
                        </div>
                    )}

                    
                    {!manualProduct && (
                        <div className="text-center">
                            {!apiProductFetched && (
                                <button
                                    onClick={fetchApi}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md my-2 transition-transform duration-200 hover:scale-105'
                                >
                                    Fetch Product
                                </button>
                            )}

                            {apiProductFetched && (
                                <div className="transition-all duration-500">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="title"
                                            value={product.title}
                                            disabled
                                            className='bg-gray-200 border border-gray-300 px-4 py-2 w-full rounded-md outline-none'
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            disabled
                                            className='bg-gray-200 border border-gray-300 px-4 py-2 w-full rounded-md outline-none'
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="productImageUrl"
                                            value={product.productImageUrl}
                                            disabled
                                            className='bg-gray-200 border border-gray-300 px-4 py-2 w-full rounded-md outline-none'
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            value={product.description}
                                            disabled
                                            name="description"
                                            rows="5"
                                            className="bg-gray-200 border border-gray-300 px-4 py-2 w-full rounded-md outline-none"
                                        />
                                    </div>

                                   
                                    {product?.productImageUrl && (
                                        <div className="m-5">
                                            <h3 className="text-lg font-semibold text-blue-500">Product Image Preview</h3>
                                            <img
                                                src={product?.productImageUrl}
                                                alt="Product Preview"
                                                className="w-full h-auto max-w-md mx-auto mt-3 rounded-lg shadow-lg transition-opacity duration-300 opacity-0 fade-in flex justify-center"
                                                style={{ animation: "fadeIn 0.8s forwards" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        >
                            <option disabled>Select Product Category</option>
                            {Object.keys(categoryList).map((category, index) => (
                                <option className="first-letter:uppercase" key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md transition-transform duration-200 hover:scale-105'
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddProductPage;
