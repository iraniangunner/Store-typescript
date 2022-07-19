import { useState } from "react";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  setConfirm,
  setEmail,
  setPassword,
  setUsername,
  email,
} from "../State/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  // const userEmail = useSelector(email);

  const inputRef = useRef<HTMLInputElement>(null);

  interface Form {
    userName: string;
    passWord: string;
    emailAddress: string;
    passConfirmation: string;
  }

  const [formValues, setFormvalues] = useState<Form>({
    userName: "",
    passWord: "",
    emailAddress: "",
    passConfirmation: "",
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // inputRef.current?.focus();
  }, []);

  const changeHandler = (e: any) => {
    setFormvalues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   dispatch(setUsername(formValues.userName));
  //   dispatch(setEmail(formValues.emailAddress));
  //   dispatch(setPassword(formValues.passWord));
  //   dispatch(setConfirm(formValues.passConfirmation));
  // };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/getOne/${formValues.emailAddress.toString()}`
    );
    const record = await response.json();
    if (formValues.emailAddress == record?.email) {
      toast.error("This Email is exist");
      return;
    }
    const newPerson = {
      email: formValues.emailAddress,
      username: formValues.userName,
      password: formValues.passWord,
      products: [],
      basket: [],
    };

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    if (res?.status === 200) {
      window.alert("success");
      setFormvalues({
        userName: "",
        passWord: "",
        emailAddress: "",
        passConfirmation: "",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 bg-[#f6f8fa] dark:bg-gray-700 mx-auto my-8 p-5 rounded-[6px] border border-solid border-[hsla(210,18%,87%,1)]"
      >
        <div className="w-full mb-[16px]">
          <label
            htmlFor="email"
            className="block text-[14px] mb-[8px] font-[400] dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            onChange={changeHandler}
            value={formValues.emailAddress}
            ref={inputRef}
            name="emailAddress"
            className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <div className="w-full mb-[16px]">
          <label
            htmlFor="name"
            className="block text-[14px] mb-[8px] font-[400] dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="name"
            onChange={changeHandler}
            value={formValues.userName}
            name="userName"
            className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <div className="w-full mb-[16px]">
          <label
            htmlFor="password"
            className="block text-[14px] mb-[8px] font-[400] dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={changeHandler}
            value={formValues.passWord}
            name="passWord"
            className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <div className="w-full mb-[16px]">
          <label
            htmlFor="confirmation"
            className="block text-[14px] mb-[8px] font-[400] dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirmation"
            onChange={changeHandler}
            value={formValues.passConfirmation}
            name="passConfirmation"
            className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2da44e] hover:bg-[#2c974b] text-white font-bold py-2 px-4 mt-2 cursor-pointer rounded-[6px]"
        >
          Sign up
        </button>
      </form>

      <div className="flex justify-between flex-wrap w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mx-auto bg-[#f6f8fa] dark:bg-gray-700 px-[16px] py-[16px] border border-solid border-[#d0d7de] rounded-[6px] text-[14px]">
        <span className="dark:text-white">Already have an account?</span>
        <Link to="/sign-in" className="text-[#0969da]">
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignUp;
