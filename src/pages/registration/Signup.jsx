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
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const userSignupFunction = async () => {
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      }
      const userRefrence = collection(fireDB, "user")
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: ""
      })

      toast.success("Signup Successfully");

      setLoading(false);
      navigate('/login')
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Signup Failed");
    }
  }

  return (
    <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300">
      {loading && <Loader />}

      <div className="bg-white bg-opacity-80 px-10 py-8 border border-pink-200 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-extrabold text-pink-600">
            Signup
          </h2>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value
              })
            }}
            className="w-80 bg-white bg-opacity-70 border border-pink-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 placeholder-pink-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
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
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value
              })
            }}
            className="w-80 bg-white bg-opacity-70 border border-pink-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 placeholder-pink-400"
          />
        </div>
        <div className="mb-6">
          <button
            type="button"
            onClick={userSignupFunction}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Signup
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link className="text-pink-600 font-bold hover:underline" to={'/login'}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Signup;
