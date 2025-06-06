import React, { Fragment, useContext, useState, useEffect } from 'react'
import myContext from '../../context/myContext'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode, isLoggedIn, setIsLoggedIn } = context;

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('users'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      console.log(storedUser);
      setEmail(storedUser.email);
      console.log(email);
    }
  }, [])


  const cartItems = useSelector((state) => state.cart || []);


  const logout = () => {
    localStorage.removeItem('users');
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/';
  }

  return (
    <div className='bg-white sticky top-0 z-50'>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6 ">

                <Link to={'/'} className="block font-medium text-gray-900"
                        style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Home
                  </Link>

                  <Link to={'/allproducts'} className="block font-medium text-gray-900"
                        style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>

                  {isLoggedIn && user?.role !== "admin" && (
                    <div className="flow-root">
                      <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }}
                        className="-m-2 block p-2 font-medium text-gray-900">
                        Order
                      </Link>
                    </div>
                  )}

                  {email === "himanshupantwal5@gmail.com" && (
                    <div className="flow-root">
                      <Link to={'/admin-dashboard'} className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Admin
                      </Link>
                    </div>
                  )}

                  {isLoggedIn ? (
                    <div className="flow-root">
                      <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Logout
                      </a>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <Link to={'/signup'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Signup
                      </Link>
                    </div>
                  )}

                  <div className="flow-root">
                    <Link to={email === 'himanshupantwal5@gmail.com' ? "/admin-dashboard" : "/user-dashboard"} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img className="inline-block w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                        alt="profile icon" />
                    </Link>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>


              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex">
                    {/* <h1 className='text-2xl font-bold px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>
                      E-commerce
                    </h1> */}
                    <img src='https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg?t=st=1729499744~exp=1729503344~hmac=a2d11797ce282da965c5e6c0ea904c610ff9cb1076fb543268f5d395eec23a2e&w=740' className='size-[3.5rem] rounded-full my-2'></img>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to={'/'} className="text-sm font-medium text-gray-700" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Home
                  </Link>

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>

                  {isLoggedIn && user ? (
                    (email !== "himanshupantwal5@gmail.com" && user?.role !== "admin") ? (
                      <Link to={'/order'} className="text-sm font-medium text-gray-700"
                        style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Order
                      </Link>
                    ) : null
                  ) : (
                    <Link to={'/signup'} className="text-sm font-medium text-gray-700"
                      style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>
                  )}

                  {user && isLoggedIn ? <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a> : ""}
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <Link to={email === 'himanshupantwal5@gmail.com' ? "/admin-dashboard" : "/user-dashboard"} className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"

                      alt="image" />
                  </Link>
                </div>

                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  {user?.role !== "admin" ? <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{user ? cartItems.length : 0}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link> : null
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar