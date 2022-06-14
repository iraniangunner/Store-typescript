import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  interface Form {
    userName: string;
    passWord: string;
  }

  const [formValues, setFormvalues] = useState<Form>({
    userName: "",
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

  const submitHandler = (e: any) => {
    e.preventDefault();
    // setFinalValues({
    //   ...finalValues,
    //   ...formValues,
    // });
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 bg-[#f6f8fa] dark:bg-gray-200 mx-auto my-8 p-5 rounded-[6px] border border-solid border-[hsla(210,18%,87%,1)]"
      >
        <div className="w-full mb-[16px]">
          <label
            htmlFor="name"
            className="block text-[14px] mb-[8px] font-[400] dark:text-black"
          >
            Username or email address
          </label>
          <input
            type="text"
            id="name"
            onChange={changeHandler}
            ref={inputRef}
            name="userName"
            className="block w-full bg-white px-[12px] py-[5px] text-[#24292f] text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <div className="w-full mb-[16px]">
          <label
            htmlFor="password"
            className="flex justify-between flex-wrap text-[14px] mb-[8px] font-[400] dark:text-black"
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
            className="block w-full bg-white px-[12px] py-[5px] text-[#24292f] text-[14px] border border-solid border-[#d0d7de] focus:outline-none focus:border-[#0969da] focus:shadow-inner-[0_0_0_32px_#ffffff] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2da44e] hover:bg-[#2c974b] text-white font-bold py-2 px-4 mt-2 cursor-pointer rounded-[6px]"
        >
          Log in
        </button>
      </form>

      <div className="flex justify-between flex-wrap w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 mx-auto bg-[#f6f8fa] dark:bg-gray-300 px-[16px] py-[16px] border border-solid border-[#d0d7de] rounded-[6px] text-[14px]">
        <span className="dark:text-black">New To Here?</span>
        <Link to="/sign-up" className="text-[#0969da]">
          Create an account
        </Link>
      </div>
      {/* <div className="text-center h-24">
        {finalValues.userName && finalValues.passWord && (
          <>
            <p>username : {finalValues.userName}</p>
            <p>password : {finalValues.passWord}</p>
          </>
        )}
      </div> */}
    </>
  );
};

export default SignIn;
