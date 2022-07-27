import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setEmail, setPassword, setUsername } from "../State/userSlice";
import * as Yup from "yup";
import { Formik } from "formik";

const SignIn = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface Form {
    email: string;
    passWord: string;
  }

  const initialValues: Form = {
    email: "",
    passWord: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
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

  // const submitHandler = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:5000/getOne/${formValues.email}`
  //     );

  //     // if (
  //     //   formValues.email !== data?.email ||
  //     //   formValues.passWord !== data?.password
  //     // ) {
  //     //   toast.error("Email or password is not correct");
  //     // } else {
  //     //   dispatch(setEmail(data.email));
  //     //   dispatch(setUsername(data.username));
  //     //   navigate("/");
  //     // }
  //     if (data && data.password === formValues.passWord) {
  //       dispatch(setEmail(data.email));
  //       dispatch(setUsername(data.username));
  //       navigate("/");
  //     } else if (data && data.password !== formValues.passWord) {
  //       toast.error("password is not correct");
  //     } else {
  //       toast.error("This email doesn't exist");
  //     }
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={async (formValues) => {
          try {
            const { data } = await axios.get(
              `http://localhost:5000/getOne/${formValues.email}`
            );

            if (data && data.password === formValues.passWord) {
              dispatch(setEmail(data.email));
              dispatch(setUsername(data.username));
              navigate("/");
            } else if (data && data.password !== formValues.passWord) {
              toast.error("password is not correct");
            } else {
              toast.error("This email doesn't exist");
            }
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 bg-[#f6f8fa] dark:bg-gray-700 mx-auto my-8 p-5 rounded-[6px] border border-solid border-[hsla(210,18%,87%,1)]"
            >
              <div className="w-full mb-[16px]">
                <label
                  htmlFor="email"
                  className="block text-[14px] mb-[8px] font-[400] dark:text-white"
                >
                  email address
                </label>
                <input
                  type="text"
                  id="email"
                  {...formik.getFieldProps("email")}
                  ref={inputRef}
                  name="email"
                  className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-400 text-sm mt-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="w-full mb-[16px]">
                <label
                  htmlFor="password"
                  className="flex justify-between flex-wrap text-[14px] mb-[8px] font-[400] dark:text-white"
                >
                  <span>Password</span>
                  <Link to="/pass-reset" className="text-[#0969da] text-[12px]">
                    Forgot password?
                  </Link>
                </label>
                <input
                  type="password"
                  id="password"
                  {...formik.getFieldProps("passWord")}
                  name="passWord"
                  className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
                />
                {formik.errors.passWord && formik.touched.passWord && (
                  <div className="text-red-400 text-sm mt-2">
                    {formik.errors.passWord}
                  </div>
                )}
              </div>

              <button
                disabled={!formik.isValid}
                type="submit"
                className={`  ${
                  !formik.isValid && "opacity-50 cursor-not-allowed"
                }  w-full bg-[#2da44e] hover:bg-[#2c974b] text-white font-bold py-2 px-4 mt-2 cursor-pointer rounded-[6px]`}
              >
                Log in
              </button>
            </form>
          );
        }}
      </Formik>
      <div className="flex justify-between flex-wrap w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mx-auto bg-[#f6f8fa] dark:bg-gray-700 px-[16px] py-[16px] border border-solid border-[#d0d7de] rounded-[6px] text-[14px]">
        <span className="dark:text-white">New To Here?</span>
        <Link to="/sign-up" className="text-[#0969da]">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
