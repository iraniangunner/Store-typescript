import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { Switch } from "@headlessui/react";
import logo from "../images/NFT logo.png";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import axios from "axios";

const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isloaded, setIsLoaded] = useState<number>(-1);
  const [isError, setIsError] = useState<boolean>(false);


  const [theme, setTheme] = useState<boolean>(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const { pathname } = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    if (inputRef.current) {
      inputRef.current.checked = false;
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/cart")
      .then((res) => {
        setIsError(false);
        if (!props.quantity) {
          props.setQuantity(
            res.data
              .map((item: any) => item.quantity)
              .reduce((acc: number, curr: number) => acc + curr, 0)
          );
        }
        props.setCartProducts(res.data);
      })
      .catch((err) => {
        // how to handle error?!
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const themeSwitch = () => {
    setTheme(!theme);
  };

  const decreaseQuantity = (id: number, itemQuantity: number) => {
    setIsLoaded(id);
    if (itemQuantity === 1) {
      axios
        .delete(`http://localhost:3001/cart/${id}`)
        .then((res) => {
          props.setQuantity((prev: any) => prev - 1);
          const updatedProducts = props.cartProducts.filter(
            (item: any) => item.id !== id
          );
          props.setCartProducts(updatedProducts);
          props.setButtonStatus("");
          setIsError(false);
          setIsLoaded(-1);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoaded(-1);
        });
    } else {
      axios
        .patch(`http://localhost:3001/cart/${id}`, {
          quantity: itemQuantity - 1,
        })
        .then((res) => {
          props.setQuantity((prev: any) => prev - 1);
          const index = props.cartProducts.findIndex(
            (item: any) => item.id === id
          );
          const selectedCartItem = { ...props.cartProducts[index] };
          selectedCartItem.quantity = res.data.quantity;
          const updatedCartItems = [...props.cartProducts];
          updatedCartItems[index] = selectedCartItem;
          props.setCartProducts(updatedCartItems);
          setIsError(false);
          setIsLoaded(-1);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoaded(-1);
        });
    }
  };

  const increaseQuantity = (id: number, itemQuantity: number) => {
    setIsLoaded(id);
    axios
      .patch(`http://localhost:3001/cart/${id}`, { quantity: itemQuantity + 1 })
      .then((res) => {
        props.setQuantity((prev: any) => prev + 1);
        const index = props.cartProducts.findIndex(
          (item: any) => item.id === id
        );
        const selectedCartItem = { ...props.cartProducts[index] };
        selectedCartItem.quantity = res.data.quantity;
        const updatedCartItems = [...props.cartProducts];
        updatedCartItems[index] = selectedCartItem;
        props.setCartProducts(updatedCartItems);
        setIsError(false);
        setIsLoaded(-1);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoaded(-1);
      });
  };

  return (
    <header className="sticky top-0 z-30">
      <nav className="bg-gray-50 dark:bg-gray-800 w-full flex justify-between items-center py-1 px-4">
        <div className="logo cursor-pointer ">
          <Link to="/" className="text-2xl text-gray-900">
            <img src={logo} alt="NFT Logo" />
          </Link>
        </div>
        <div className="hidden lg:flex links justify-end ml-auto ">
          <ul className="hidden lg:flex justify-between items-center transition-all ease-linear duration-200">
            <li className="flex justify-center items-center mx-2">
              <Link
                className="relative p-4 text-gray-900 dark:text-gray-50 after:absolute after:bottom-[5px] after:inset-x-0 after:m-auto after:w-0 after:content-['.'] after:text-transparent after:bg-[#aaa] after:h-[1px] after:transition[width] after:duration-[0.5s] hover:text-[#555] hover:after:w-[80%]"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="flex justify-center items-center mx-2">
              <Link
                className="relative p-4 text-gray-900 dark:text-gray-50 after:absolute after:bottom-[5px] after:inset-x-0 after:m-auto after:w-0 after:content-['.'] after:text-transparent after:bg-[#aaa] after:h-[1px] after:transition[width] after:duration-[0.5s] hover:text-[#555] hover:after:w-[80%]"
                to="/create"
              >
                Create
              </Link>
            </li>
            <li className="flex justify-center items-center mx-2">
              <Link
                className="relative p-4 text-gray-900 dark:text-gray-50 after:absolute after:bottom-[5px] after:inset-x-0 after:m-auto after:w-0 after:content-['.'] after:text-transparent after:bg-[#aaa] after:h-[1px] after:transition[width] after:duration-[0.5s] hover:text-[#555] hover:after:w-[80%]"
                to="/market-place"
              >
                Marketplace
              </Link>
            </li>
            <li className="flex justify-center items-center mx-2 rounded-lg">
              <label
                htmlFor="my-modal-4"
                className="p-3 text-gray-900 dark:text-slate-50 relative cursor-pointer btn bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 border-none hover:bg-slate-300 transition-all"
              >
                <FaShoppingBag size={20} />
                {props.quantity ? (
                  <span className="absolute text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs -top-2 -right-2">
                    {props.quantity}
                  </span>
                ) : null}
              </label>
              <input
                type="checkbox"
                id="my-modal-4"
                className="modal-toggle"
                ref={inputRef}
              />
              <label htmlFor="my-modal-4" className="modal">
                <label
                  className="modal-box relative dark:text-white overflow-y-auto dark:bg-[rgba(12,36,63,1)]"
                  htmlFor=""
                >
                  {props.cartProducts.length ? (
                    <>
                      {props.cartProducts.map((item: any, index: number) => (
                        <div
                          className="flex justify-between border-b p-2"
                          key={index}
                        >
                          <div className="flex-1">
                            <img
                              src={item["files"][0]["data_url"]}
                              className="w-[100px] h-[100px] object-cover"
                            />
                            <p className="text-sm mt-1">
                              {item["productTitle"]}
                            </p>
                          </div>
                          <div className="flex justify-center items-center flex-1">
                            <button
                              type="button"
                              className="bg-slate-200 dark:bg-gray-700 w-[30px] h-[30px] rounded-md mr-3 flex justify-center items-center"
                              onClick={() =>
                                decreaseQuantity(item.id, item.quantity)
                              }
                            >
                              {item.quantity === 1 ? <BsTrash /> : "-"}
                            </button>
                            {isloaded === item.id ? (
                              <div className="relative w-[5px] h-[5px] rounded-[50%] bg-[#9880ff] text-[#9880ff] animate-[dotFlashing_1s_linear_0.5s_infinite_alternate] before:content-[''] after:content-[''] before:inline-block after:inline-block before:absolute after:absolute before:top-0 after:top-0 before:left-[-8px] before:w-[5px] before:h-[5px] before:rounded-[50%] before:bg-[#9880ff] before:text-[#9880ff] before:animate-[dotFlashing_1s_0s_infinite_alternate] after:left-[8px] after:w-[5px] after:h-[5px] after:rounded-[50%] after:bg-[#9880ff] after:text-[#9880ff] after:animate-[dotFlashing_1s_1s_infinite_alternate]"></div>
                            ) : (
                              <div>{item.quantity}</div>
                            )}
                            <button
                              type="button"
                              className="bg-slate-200 dark:bg-gray-700 w-[30px] h-[30px] rounded-md ml-3 flex justify-center items-center"
                              onClick={() =>
                                increaseQuantity(item.id, item.quantity)
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="flex justify-center items-center flex-1">
                            <span>{item["productPrice"]} ETH</span>
                          </div>
                        </div>
                      ))}
                      {isError ? (
                        <p className="text-red-500">server error try again!</p>
                      ) : (
                        ""
                      )}
                      <Link
                        to="/shopping-cart"
                        className="flex items-center justify-center w-full py-4 mt-4 rounded-lg border border-white border-opacity-0 bg-blue-100 dark:bg-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-white font-semibold text-lg transition-all"
                        onClick={closeModal}
                      >
                        <span className="mt-1">Go to your cart</span>
                        <IoIosArrowForward
                          className="text-blue-700 dark:text-white mt-1 ml-2"
                          size={20}
                        />
                      </Link>
                    </>
                  ) : (
                    <div>
                      <span>Your cart is empty!</span>
                      {isError ? (
                        <p className="text-red-500">server error try again!</p>
                      ) : (
                        ""
                      )}
                      <Link
                        to="/market-place"
                        className="flex items-center justify-center w-full py-4 mt-4 rounded-lg border border-white border-opacity-0 bg-blue-100 dark:bg-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-white font-semibold text-lg transition-all"
                        onClick={closeModal}
                      >
                        <span className="mt-1">Go to Marketplace</span>
                        <IoIosArrowForward
                          className="text-blue-700 dark:text-white mt-1 ml-2"
                          size={20}
                        />
                      </Link>
                    </div>
                  )}
                </label>
              </label>
            </li>
            <li className="flex justify-center items-center mx-2">
              <div className="text-base p-4">
                <Switch
                  checked={theme}
                  onChange={() => themeSwitch()}
                  className={`${
                    theme ? "bg-gray-700 " : "bg-gray-300"
                  } relative vs:hidden  md:inline-flex flex-shrink-0 items-center h-[33px] w-[65px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ltrDirection`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      theme
                        ? "translate-x-8 bg-gray-900"
                        : "translate-x-0 bg-white"
                    }
pointer-events-none md:flex items-center justify-center h-[29px] w-[29px] rounded-full  shadow-lg transform ring-0 transition ease-in-out duration-200 ltrDirection`}
                  >
                    {theme ? (
                      <BsFillMoonFill className="text-[20px] text-blue-200" />
                    ) : (
                      <BiSun className="text-[20px] text-yellow-600" />
                    )}
                  </span>
                </Switch>
              </div>
            </li>
            <li className="flex justify-center items-cente mx-2">
              <Link
                to="/sign-up"
                className="rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all dark:text-gray-50 py-2 px-4 cursor-pointer"
              >
                SignUp
              </Link>
            </li>
            <li className="flex justify-center items-center mx-2">
              <Link
                to="/sign-in"
                className="rounded-lg bg-blue-500 hover:bg-blue-700 transition-all text-white py-2 px-4 cursor-pointer"
              >
                LogIn
              </Link>
            </li>
          </ul>
        </div>
        <div className="menuIcon dark:text-gray-50 inline-block text-gray-900 rounded-md mr-0 ml-auto lg:hidden">
          <Hamburger
            toggled={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            duration={0.4}
            rounded
            size={30}
          />
        </div>
      </nav>
      {isOpen && (
        <div className="lg:hidden bg-gray-50 dark:bg-gray-800 pb-3 pt-1 w-full shadow-2xl z-10">
          <ul className="lg:hidden space-y-4">
            <li className="cursor-pointer hover:bg-gray-500 transition-all ease-linear duration-200 mx-3 p-3">
              <Link to="/" className="block text-gray-900 dark:text-gray-50">
                Home
              </Link>
            </li>
            <li className="cursor-pointer hover:bg-gray-500 transition-all ease-linear duration-200 mx-3 p-3">
              <Link
                className="block text-gray-900 dark:text-gray-50"
                to="/create"
              >
                Create
              </Link>
            </li>
            <li className="cursor-pointer hover:bg-gray-500 transition-all ease-linear duration-200 mx-3 p-3">
              <Link
                className="block text-gray-900 dark:text-gray-50"
                to="/market-place"
              >
                Marketplace
              </Link>
            </li>
            <li className="cursor-pointer hover:bg-gray-500 transition-all ease-linear duration-200 mx-3 p-3">
              <Link
                to="/shopping-cart"
                className="p-3 text-gray-900 dark:text-slate-50 relative cursor-pointer btn modal-button bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 border-none hover:bg-slate-300 transition-all"
              >
                <FaShoppingBag size={20} />
                {props.quantity ? (
                  <span className="absolute text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs -top-2 -right-2">
                    {props.quantity}
                  </span>
                ) : null}
              </Link>
              <span className="ml-2">Shopping Cart</span>
            </li>
            <li className="flex items-center justify-between mx-3 p-3">
              <p className="text-gray-900 dark:text-gray-50">Theme Mode</p>
              <div className="text-base">
                <Switch
                  checked={theme}
                  onChange={() => themeSwitch()}
                  className={`${theme ? "bg-gray-700 " : "bg-gray-300"}
        relative inline-flex flex-shrink-0 items-center h-[33px] w-[68px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ltrDirection`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      theme
                        ? "translate-x-9 bg-gray-900"
                        : "translate-x-0 bg-white"
                    }
pointer-events-none flex items-center justify-center h-[29px] w-[29px] rounded-full  shadow-lg transform ring-0 transition ease-in-out duration-200 ltrDirection`}
                  >
                    {theme ? (
                      <BsFillMoonFill className="text-[20px] text-blue-200" />
                    ) : (
                      <BiSun className="text-[20px] text-yellow-600" />
                    )}
                  </span>
                </Switch>
              </div>
            </li>
            <div className="flex items-center py-4 pl-4">
              <li className="hover:text-gray-900 transition-all ease-linear duration-200">
                <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                  <button className="rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all dark:text-gray-50 py-2 px-4 cursor-pointer">
                    SignUp
                  </button>
                </Link>
              </li>
              <li className="hover:text-gray-900 transition-all ease-linear duration-200 ml-3">
                <Link
                  className="mr-3"
                  to="/sign-in"
                  onClick={() => setIsOpen(false)}
                >
                  <button className="rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition-all py-2 px-4 cursor-pointer">
                    LogIn
                  </button>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
