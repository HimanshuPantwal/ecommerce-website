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
  const { loading, setLoading } = context;

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300">
      {loading && <Loader />}

      <div className="bg-white bg-opacity-80 px-10 py-8 border border-pink-200 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-extrabold text-pink-600">
            Login
          </h2>
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
              })
            }}
            className="w-80 bg-white bg-opacity-70 border border-pink-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 placeholder-pink-400"
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
              })
            }}
            className="w-80 bg-white bg-opacity-70 border border-pink-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 placeholder-pink-400"
          />
        </div>

        <div className="mb-6">
          <button
            type="button"
            onClick={userLoginFunction}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Login
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link className="text-pink-600 font-bold hover:underline" to={'/signup'}>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Login;
