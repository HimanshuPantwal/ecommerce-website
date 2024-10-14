import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, orderDelete } = context;

  return (
    <div className="px-4 py-5">
      <div className="pb-5 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500">
          All Orders
        </h1>
      </div>

      <div className="w-full overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full text-left bg-white border-collapse sm:border-separate border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-gray-800 font-semibold">S.No.</th>
              <th className="p-3 text-gray-800 font-semibold">Order ID</th>
              <th className="p-3 text-gray-800 font-semibold">Image</th>
              <th className="p-3 text-gray-800 font-semibold">Title</th>
              <th className="p-3 text-gray-800 font-semibold">Category</th>
              <th className="p-3 text-gray-800 font-semibold">Price</th>
              <th className="p-3 text-gray-800 font-semibold">Quantity</th>
              <th className="p-3 text-gray-800 font-semibold">Total Price</th>
              <th className="p-3 text-gray-800 font-semibold">Status</th>
              <th className="p-3 text-gray-800 font-semibold">Name</th>
              <th className="p-3 text-gray-800 font-semibold">Address</th>
              <th className="p-3 text-gray-800 font-semibold">Pincode</th>
              <th className="p-3 text-gray-800 font-semibold">Phone</th>
              <th className="p-3 text-gray-800 font-semibold">Email</th>
              <th className="p-3 text-gray-800 font-semibold">Date</th>
              <th className="p-3 text-gray-800 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllOrder.map((order, orderIndex) => (
              <>
                {order.cartItems.map((item, index) => {
                  const { id, productImageUrl, title, category, price, quantity } = item;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {orderIndex + 1}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {id}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        <img
                          src={productImageUrl}
                          alt="img"
                          className="w-16 h-16 object-cover rounded-md shadow-sm"
                        />
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600 capitalize">
                        {title}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600 capitalize">
                        {category}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        ₹{price}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {quantity}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        ₹{price * quantity}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-green-500 font-bold">
                        {order.status}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {order.addressInfo.name}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {order.addressInfo.address}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {order.addressInfo.pincode}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {order.addressInfo.mobileNumber}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {order.email}
                      </td>
                      <td className="p-3 border-t border-gray-200 text-gray-600">
                        {order.date}
                      </td>
                      <td className="p-3 border-t border-gray-200">
                        <button
                          onClick={() => orderDelete(order.id)}
                          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
