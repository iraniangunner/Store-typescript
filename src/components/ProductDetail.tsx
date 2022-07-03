import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = (props: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const { id } = useParams();

  interface Detail {
    productPrice: string;
    productTitle: string;
    productDesc: string;
    files: any[];
  }

  const [productDetails, setProductDetails] = useState<Detail>({
    productPrice: "",
    productTitle: "",
    productDesc: "",
    files: [],
  });

  const addToCartHandler = (e: any) => {
    props.setButtonStatus("pending");
    e.preventDefault();
    axios
      .post("http://localhost:3001/cart", {
        ...productDetails,
        id: id,
        quantity: 1,
      })
      .then((res) => {
        toast.success("Successfully added to your cart!");
        props.setQuantity((prevQuantity: number) => prevQuantity + 1);
        props.setButtonStatus("success");
        props.setCartProducts([...props.cartProducts , res.data])
      })
      .catch((err) => {
        toast.error("Sorry try again!");
        props.setButtonStatus("");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProductDetails(res.data))
      .catch((err) => setIsLoaded(false));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cart")
      .then((res) => {
        const availableIds = res.data.map((item: any) => item.id);
        availableIds.includes(id)
          ? props.setButtonStatus("success")
          : props.setButtonStatus("");
      })
      .catch((err) => setIsLoaded(false));
  }, []);

  return (
    <div className="w-full xl:w-10/12 p-3 sm:p-5 mx-auto min-h-[80vh]">
      {productDetails.files.length && isLoaded ? (
        <>
          <div className="flex flex-col items-center md:flex-row p-6">
            <div className="w-[80%] md:w-[40%]">
              <Carousel>
                {productDetails["files"].map((item, index) => {
                  return (
                    <div className="aspect-square" key={index}>
                      <img
                        src={item["data_url"]}
                        alt="image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="w-[80%] md:w-[60%] ml-6 p-6 mb-auto flex flex-col items-start">
              <h1 className="font-bold">{productDetails["productTitle"]}</h1>
              <p className="mt-2">By Fateh Moonesi</p>
              <div className="mt-6 px-2 py-2 bg-blue-100 text-sky-400 rounded-md">
                <span className="mr-2 text-xl">
                  {productDetails["productPrice"]}
                </span>
                <span className="text-sm text-gray-500">ETH</span>
              </div>
              <div className="mt-6">
                <p className="text-md mb-2">Description:</p>
                <p>{productDetails["productDesc"]}</p>
              </div>
              {!props.buttonStatus ? (
                <button
                  type="button"
                  className="mt-10 px-4 py-2 w-[40%] rounded-md bg-red-500 text-white hover:bg-red-700 transition-all"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>
              ) : props.buttonStatus === "pending" ? (
                <button
                  className="mt-10 px-4 py-2 w-[40%] rounded-md bg-red-300 text-white flex justify-center items-center"
                  disabled
                >
                  <svg
                    role="status"
                    className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </button>
              ) : props.buttonStatus === "success" ? (
                <Link
                  to="/shopping-cart"
                  className="block mt-10 px-4 py-2 w-[40%] rounded-md bg-green-500 text-white hover:bg-green-800 transition-all text-sm text-center"
                >
                  Go to shopping Cart
                </Link>
              ) : null}
              <ToastContainer />
            </div>
          </div>
        </>
      ) : !productDetails.files.length && isLoaded ? (
        <p>Data is loading...</p>
      ) : (
        <p>Internal server error!</p>
      )}
    </div>
  );
};

export default ProductPage;
