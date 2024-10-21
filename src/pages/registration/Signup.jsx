import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;

  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      const userRefrence = collection(fireDB, "user");
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Signup Failed");
    }
  };

  return (
    <Layout>
      <div
        className={`min-h-screen flex justify-center items-center ${
          mode === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {loading && <Loader />}
        <div
          className={`${
            mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          } w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row h-[32rem] mx-8 `}
        >
         
          <div className="md:w-1/2 p-8 ">
            <h2
              className={`text-3xl font-bold ${
                mode === "dark" ? "text-white" : "text-gray-700"
              } mb-4`}
            >
              Create your account
            </h2>
            <p
              className={`${
                mode === "dark" ? "text-gray-400" : "text-gray-500"
              } mb-6`}
            >
              Let's get started
            </p>

            <input
              type="text"
              placeholder="Full Name"
              value={userSignup.name}
              onChange={(e) =>
                setUserSignup({ ...userSignup, name: e.target.value })
              }
              className={`w-full border ${
                mode === "dark" ? "border-gray-600" : "border-gray-300"
              } p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 ${
                mode === "dark" ? "focus:ring-yellow-500" : "focus:ring-blue-500"
              } ${
                mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={userSignup.email}
              onChange={(e) =>
                setUserSignup({ ...userSignup, email: e.target.value })
              }
              className={`w-full border ${
                mode === "dark" ? "border-gray-600" : "border-gray-300"
              } p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 ${
                mode === "dark" ? "focus:ring-yellow-500" : "focus:ring-blue-500"
              } ${
                mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              value={userSignup.password}
              onChange={(e) =>
                setUserSignup({ ...userSignup, password: e.target.value })
              }
              className={`w-full border ${
                mode === "dark" ? "border-gray-600" : "border-gray-300"
              } p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 ${
                mode === "dark" ? "focus:ring-yellow-500" : "focus:ring-blue-500"
              } ${
                mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            />

            <button
              type="button"
              onClick={userSignupFunction}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                mode === "dark"
                  ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Sign Up
            </button>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className={`${
                  mode === "dark"
                    ? "text-yellow-400 hover:underline"
                    : "text-blue-600 hover:underline"
                }`}
              >
                Log in
              </Link>
            </p>
          </div>

         
          <div className="md:w-1/2 h-full bg-gray-100 hidden md:block relative ">
            <img
              src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?t=st=1729447184~exp=1729450784~hmac=3c26fd8f5583ee165bb51e1937a07286b18f27acfc8b04a19f893cfacda11924&w=740"
              alt="signup"
              className="object-cover rounded-r-xl size-[100%]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
