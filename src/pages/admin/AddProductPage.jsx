import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState, useCallback,useRef } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

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
    const countRef=useRef(randomNum(3));

    const addProductFunction = async () => {
        if(fetchingFromApi&& product.category==="") {
            return toast.error("Choose Category");
        }
        if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "" && !fetchingFromApi) {
            return toast.error("all fields are required")
        }
        
        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Add product successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add product failed");
        }

    }
    const handleCategory = (ctg) => {
        for (let category in categoryList) {
            console.log(categoryList[category]);

            if (categoryList[category].some(keyword => ctg.toLowerCase().includes(keyword.toLowerCase()))) {
                return category;
            }
        }
        return '';
    }
    // useEffect(()=>{
    //     fetch("https://fakestoreapi.com/products?limit=500")
    //     .then((res) => res.json())
    //     .then((json) =>{ 
    //         console.log(json);

    //         json.map((obj)=>{
    //             setProduct({
    //                 title: obj.title,
    //                 price: obj.price,
    //                 productImageUrl: obj.image, 
    //                 category: obj.category,
    //                 description: obj.description,
    //                 quantity:randomNum(), 
    //                 time:Timestamp.now(),
    //                 date:new Date().toLocaleString("en-US", {
    //                   month: "short",
    //                   day: "2-digit",
    //                   year: "numeric",
    //                 }),    
    //         })
    //     });
    //     addProductFunction();
    // }
    // ,[])

    const fetchApi = useCallback(() => {
        console.log(countRef.current);
        setProduct({
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
        fetch(`https://fakestoreapi.in/api/products?page=${countRef.current}`)
            .then((res) => res.json())
            .then(json => {
                console.log(json);
                console.log(json['products']);
                const pdt=json['products'][randomNum(49)];
                if (handleCategory(pdt.category) !== "" || handleCategory(pdt.title) !== "") {
                    setLoading(true);
                    setProduct({
                        title: pdt.title,
                        price: pdt.price,
                        productImageUrl: pdt.image,
                        category: handleCategory(pdt.category) !== "" ? handleCategory(pdt.category) : handleCategory(pdt.title),
                        description: pdt.description,
                        quantity: randomNum(100),
                        time: Timestamp.now(),
                        date: new Date().toLocaleString("en-US", {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric'
                        }),
                    });
                    setFetchingFromApi(true);
                    addProductFunction();
                    setFetchingFromApi(false);
                    setLoading(false);
                    countRef.current=randomNum(3);
                } else {
                    toast.error("Fetch Again!!");
                    setLoading(false);
                    countRef.current=randomNum(3);
                }
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [countRef.current, handleCategory, randomNum, addProductFunction]);
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}

                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Add Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {Object.keys(categoryList).map((category, index) => {
                                return (
                                    category===product.category?<option className="first-letter:uppercase" key={index} value={category} selected>
                                        {category}
                                    </option>:<option className="first-letter:uppercase" key={index} value={category}>
                                        {category}
                                    </option>
                                );
                            })
                            }
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full text-center mb-5">
                <button onClick={fetchApi} className="w-32 h-20 rounded-xl text-center bg-blue-500">Fetch From Api</button>
            </div>
        </div>
    );
}

export default AddProductPage;
