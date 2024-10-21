import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Layout from "../../components/layout/Layout";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;  // Added mode for dark mode functionality
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

      try {
        const q = query(
          collection(fireDB, "user"),
          where('uid', '==', users?.user?.uid)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());

          localStorage.setItem("users", JSON.stringify(user));

          setUserLogin({
            email: "",
            password: ""
          });
          toast.success("Login Successfully");
          setLoading(false);

          if (user.role === "user") {
            navigate('/user-dashboard');
          } else {
            navigate('/admin-dashboard');
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
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

        <div className="flex flex-row-reverse items-center justify-between w-full max-w-5xl bg-opacity-80 rounded-xl shadow-2xl overflow-hidden border mx-4 sm:mx-8 lg:mx-12 h-full">
          <div className="hidden md:flex w-1/2 relative h-[32rem]">
            <img
              src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1729428960~exp=1729432560~hmac=b5c4b882f50cd02b8845191aa8f71e3cd22cb5c61db88787e8ef53609853cc65&w=740" // Replace with the 
              alt="Login"
              className="object-cover h-full w-full"
            />
            <div className="absolute top-0 inset-0 bg-black opacity-30 flex flex-col items-center justify-start  text-white h-[32rem]">
              <h2 className="text-4xl font-bold m-4">Welcome Back!</h2>
            </div>
          </div>

          
          <div
            className={`w-full md:w-1/2 p-10 min-h-[32rem] sm:p-12 ${
              mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-pink-200"
            }`}
          >
            <div className="mb-6">
              <h2
                 className={`text-3xl font-bold ${
                mode === "dark" ? "text-white" : "text-gray-700"
              } mb-4`}
              >
                Login
              </h2>
              <p className={`${
                mode === "dark" ? "text-gray-400" : "text-gray-500"
              } mb-6`}>
                Enter your credentials to access your account.
              </p>
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userLogin.email}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    email: e.target.value
                  });
                }}
                className={`w-full ${
                  mode === "dark"
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white border border-pink-300"
                } px-4 py-2 rounded-lg outline-none focus:ring-2 ${
                  mode === "dark" ? "focus:ring-gray-500" : "focus:ring-pink-400"
                } transition-all duration-200 placeholder-pink-400`}
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={userLogin.password}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    password: e.target.value
                  });
                }}
                className={`w-full ${
                  mode === "dark"
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white border border-pink-300"
                } px-4 py-2 rounded-lg outline-none focus:ring-2 ${
                  mode === "dark" ? "focus:ring-gray-500" : "focus:ring-pink-400"
                } transition-all duration-200 placeholder-pink-400`}
              />
            </div>

            <div className="mb-6">
              <button
                type="button"
                onClick={userLoginFunction}
                className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                mode === "dark"
                  ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <p className={`${mode === "dark" ? "text-gray-400" : "text-gray-700"}`}>
                Don't have an account?{" "}
                <Link
                  className={`${
                  mode === "dark"
                    ? "text-yellow-400 hover:underline"
                    : "text-blue-600 hover:underline"
                }`}
                  to={'/signup'}
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
