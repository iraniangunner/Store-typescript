import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { Switch } from "@headlessui/react";
import logo from "../images/NFT logo.png";
import { FaShoppingBag } from "react-icons/fa";
import axios from "axios";

const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      .then((res) => props.setQuantity(res.data.length))
      .catch((err) => props.setQuantity(""));
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

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   }else{
  //     document.body.style.overflow = "auto";
  //   }
  // },[isOpen])

  const themeSwitch = () => {
    setTheme(!theme);
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
                className="p-3 text-gray-900 dark:text-slate-50 relative cursor-pointer btn modal-button bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 border-none hover:bg-slate-300 transition-all"
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
                  className="modal-box relative dark:text-black overflow-y-auto"
                  htmlFor=""
                >
                  <h3 className="text-lg font-bold">
                    Congratulations random Interner user!
                  </h3>
                  <p className="py-4">
                    You've been selected for a chance to get one year of
                    subscription to use Wikipedia for free!
                  </p>
                  <Link
                    to="/shopping-cart"
                    className="px-4 py-2 text-gray-500"
                    onClick={closeModal}
                  >
                    See cart details
                  </Link>
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
              <a
                className="block text-gray-900 dark:text-gray-50"
                href="https://bscscan.com/token/0x80e7dc4e726E052b0dB04ec8b506596458809c11"
                target="_blank"
              >
                Home
              </a>
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
              <a
                className="block text-gray-900 dark:text-gray-50"
                href="https://bscscan.com/token/0x80e7dc4e726E052b0dB04ec8b506596458809c11"
                target="_blank"
              >
                WhitePaper
              </a>
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
