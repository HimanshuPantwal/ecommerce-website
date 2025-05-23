import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(myContext);
    const { loading, getAllOrder, mode } = context; // Added mode for dark mode toggle

    return (
        <Layout>
            <div className={`container mx-auto px-4 py-5 lg:py-8 ${mode === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
                <div className="top mb-8">
                    <div className={`py-5 rounded-xl border border-pink-100 ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#b8e2f2]'}`}>
                        <div className="flex justify-center items-center">
                            <img src="https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2876.jpg?t=st=1729452580~exp=1729456180~hmac=dbcd5d5e2383567603e225c6f7a8fed48c7240f67548e47db9d0e05b9429fc20&w=740" className="w-40 h-40 rounded-full" alt="User Avatar" />
                        </div>
                        <div className="text-center mt-4">
                            <h1 className="text-lg">
                                <span className="font-bold">Name: </span>{user?.name}
                            </h1>
                            <h1 className="text-lg">
                                <span className="font-bold">Email: </span>{user?.email}
                            </h1>
                            <h1 className="text-lg">
                                <span className="font-bold">Date: </span>{user?.date}
                            </h1>
                            <h1 className="text-lg">
                                <span className="font-bold">Role: </span>{user?.role}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>

                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            return (
                                <div key={index}>
                                    {order.cartItems.map((item, index) => {
                                        const { id, date, quantity, price, title, productImageUrl, category } = item;
                                        const { status } = order;
                                        return (
                                            <div key={index} className={`mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#ffff]'}`}>
                                                <div className="w-full border-r bg-[#b8e2f2] border-pink-100 md:max-w-xs">
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 sm:gap-6 lg:gap-0">
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-black">Order ID</div>
                                                                <div className={`text-sm font-medium break-words text-gray-900 ${mode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>#{id}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Date</div>
                                                                <div className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-900' : 'text-gray-100'}`}>{date}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Total Amount</div>
                                                                <div className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-900' : 'text-gray-100'}`}>₹ {price * quantity}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Order Status</div>
                                                                {status === 'pending' ? (
                                                                    <div className="text-sm font-medium text-red-800 first-letter:uppercase">{status}</div>
                                                                ) : (
                                                                    <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="p-8">
                                                        <ul className="-my-7 divide-y divide-gray-200">
                                                            <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                                <div className="flex flex-1 items-stretch">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                            src={productImageUrl}
                                                                            alt={title}
                                                                        />
                                                                    </div>

                                                                    <div className="ml-5 flex flex-col justify-between">
                                                                        <div className="flex-1">
                                                                            <p className={`text-sm font-bold ${mode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{title}</p>
                                                                            <p className={`mt-1.5 text-sm font-medium ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{category}</p>
                                                                        </div>

                                                                        <p className={`mt-4 text-sm font-medium ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>x {quantity}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                                    <p className={`text-right text-sm font-bold ${mode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>₹ {price}</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
