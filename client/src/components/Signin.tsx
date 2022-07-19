import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setEmail, setPassword, setUsername } from "../State/userSlice";

const SignIn = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  interface Form {
    email: string;
    passWord: string;
  }

  const [formValues, setFormvalues] = useState<Form>({
    email: "",
    passWord: "",
  });

  // const [finalValues, setFinalValues] = useState({
  //   userName: "",
  //   passWord: "",
  // });

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
  //   // setFinalValues({
  //   //   ...finalValues,
  //   //   ...formValues,
  //   // });
  // };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/getOne/${formValues.email}`
    );
    const record = await response.json();
    if (
      formValues.email !== record.email ||
      formValues.passWord !== record.password
    ) {
      toast.error("Email or password is not correct");
    } else {
      console.log(record.name)
      dispatch(setEmail(record.email));
      dispatch(setUsername(record.username));
      console.log("Success")
      navigate("/")
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
            Username or email address
          </label>
          <input
            type="text"
            id="email"
            onChange={changeHandler}
            ref={inputRef}
            name="email"
            className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
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
            onChange={changeHandler}
            name="passWord"
            className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[5px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2da44e] hover:bg-[#2c974b] text-white font-bold py-2 px-4 mt-2 cursor-pointer rounded-[6px]"
        >
          Log in
        </button>
      </form>

      <div className="flex justify-between flex-wrap w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mx-auto bg-[#f6f8fa] dark:bg-gray-700 px-[16px] py-[16px] border border-solid border-[#d0d7de] rounded-[6px] text-[14px]">
        <span className="dark:text-white">New To Here?</span>
        <Link to="/sign-up" className="text-[#0969da]">
          Create an account
        </Link>
      </div>
    </>
  );
};

export default SignIn;
