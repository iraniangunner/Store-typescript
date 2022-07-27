import axios from "axios";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";


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


  const initialValues: Form = {
    userName: "",
    passWord: "",
    emailAddress: "",
    passConfirmation: "",
  };

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Please enter a valid email!")
      .required("This field is required!"),
    passWord: Yup.string()
      .required("This field is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // inputRef.current?.focus();
  }, []);

  // const changeHandler = (e: any) => {
  //   setFormvalues({
  //     ...formValues,
  //     [e.target.name]: e.target.value,
  //   });
  // };


  const submitHandler = async (e: any) => {
    e.preventDefault();
    // try {
    //   const {data} = await axios.get(
    //     `http://localhost:5000/getOne/${formValues.emailAddress}`
    //   );

    //   // if (formValues.emailAddress === data?.email) {
    //   //   toast.error("This Email is exist");
    //   //   return;
    //   // }
    //   if (data) {
    //     toast.error("This Email is exist");
    //     console.log(data);
    //     return;
    //   }
    // } catch (error: any) {
    //   alert(error.message);
    //   return;
    // }

    // const newPerson = {
    //   email: formValues.emailAddress,
    //   username: formValues.userName,
    //   password: formValues.passWord,
    //   products: [],
    //   basket: [],
    // };

    // try {
    //   await axios.post(
    //     "http://localhost:5000/signup",
    //     JSON.stringify(newPerson)
    //   );
    //   window.alert("success");
    //   setFormvalues({
    //     userName: "",
    //     passWord: "",
    //     emailAddress: "",
    //     passConfirmation: "",
    //   });
    // } catch (error: any) {
    //   alert(error.message);
    //   return;
   // }

    // const res = await fetch("http://localhost:5000/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newPerson),
    // }).catch((error) => {
    //   window.alert(error);
    //   return;
    // });

    // if (res?.status === 200) {
    //   window.alert("success");
    //   setFormvalues({
    //     userName: "",
    //     passWord: "",
    //     emailAddress: "",
    //     passConfirmation: "",
    //   });
    // }
  };

  return (
    <div>
      <Formik initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={async (formValues) => {
          // try {
          //   const {data} = await axios.get(
          //     `http://localhost:5000/getOne/${formValues.emailAddress}`
          //   );
      
          //   // if (formValues.emailAddress === data?.email) {
          //   //   toast.error("This Email is exist");
          //   //   return;
          //   // }
          //   if (data) {
          //     toast.error("This Email is exist");
          //     console.log(data);
          //     return;
          //   }
          // } catch (error: any) {
          //   alert(error.message);
          //   return;
          // }
      
          // const newPerson = {
          //   email: formValues.emailAddress,
          //   username: formValues.userName,
          //   password: formValues.passWord,
          //   products: [],
          //   basket: [],
          // };
      
          // try {
          //   await axios.post(
          //     "http://localhost:5000/signup",
          //     JSON.stringify(newPerson)
          //   );
          //   window.alert("success");
          //   setFormvalues({
          //     userName: "",
          //     passWord: "",
          //     emailAddress: "",
          //     passConfirmation: "",
          //   });
          // } catch (error: any) {
          //   alert(error.message);
          //   return;
        }}>
        {(formik) => {
          return(
            <form
            onSubmit={formik.handleSubmit}
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
                {...formik.getFieldProps("emailAddress")}
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
                {...formik.getFieldProps("userName")}
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
                {...formik.getFieldProps("passWord")}
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
                {...formik.getFieldProps("passConfirmation")}
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
          )
        }}
      </Formik>

      <div className="flex justify-between flex-wrap w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mx-auto bg-[#f6f8fa] dark:bg-gray-700 px-[16px] py-[16px] border border-solid border-[#d0d7de] rounded-[6px] text-[14px]">
        <span className="dark:text-white">Already have an account?</span>
        <Link to="/sign-in" className="text-[#0969da]">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
