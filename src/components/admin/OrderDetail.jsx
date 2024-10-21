import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, orderDelete } = context;

  return (
    <div className="px-4 py-5 dark:bg-gray-900">
      <div className="pb-5 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 dark:text-pink-400">
          All Orders
        </h1>
      </div>

      <div className="w-full overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full text-left bg-white dark:bg-gray-800 border-collapse sm:border-separate border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                S.No.
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Order ID
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Image
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Title
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Category
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Price
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Quantity
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Total Price
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Status
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Name
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Address
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Pincode
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Phone
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Email
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Date
              </th>
              <th className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllOrder.map((order, orderIndex) => (
              <>
                {order.cartItems.map((item, index) => {
                  const {
                    id,
                    productImageUrl,
                    title,
                    category,
                    price,
                    quantity,
                  } = item;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {orderIndex + 1}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {id}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        <img
                          src={productImageUrl}
                          alt="img"
                          className="w-16 h-16 object-cover rounded-md shadow-sm"
                        />
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 capitalize">
                        {title}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 capitalize">
                        {category}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        ₹{price}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {quantity}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        ₹{price * quantity}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-green-500 dark:text-green-400 font-bold">
                        {order.status}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {order.addressInfo.name}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {order.addressInfo.address}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {order.addressInfo.pincode}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {order.addressInfo.mobileNumber}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {order.email}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                        {order.date}
                      </td>
                      <td className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => orderDelete(order.id)}
                          className="px-4 py-2 text-white bg-[#b8e2f2] rounded-lg hover:bg-blue-400 transition duration-300"
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
