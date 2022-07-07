import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const ShoppingCartModal = (props: any) => {
  const [clickedItemId, setClickedItemId] = useState<number>(-1);
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
        toast.error("Can not get your cart products!");
      });
  }, []);

  const decreaseQuantity = (id: number, itemQuantity: number) => {
    setClickedItemId(id);
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
          setClickedItemId(-1);
        })
        .catch((err) => {
          toast.error("Somthing went wrong try again!");
          setClickedItemId(-1);
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
          
          setClickedItemId(-1);
        })
        .catch((err) => {
          toast.error("Somthing went wrong try again!");
          setClickedItemId(-1);
        });
    }
  };

  const increaseQuantity = (id: number, itemQuantity: number) => {
    setClickedItemId(id);
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
        setClickedItemId(-1);
      })
      .catch((err) => {
        toast.error("Somthing went wrong try again!");
        setClickedItemId(-1);
      });
  };

  return (
    <>
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
                <div className="flex justify-between border-b p-2" key={index}>
                  <div className="flex-1">
                    <img
                      src={item["files"][0]["data_url"]}
                      className="w-[100px] h-[100px] object-cover"
                    />
                    <p className="text-sm mt-1">{item["productTitle"]}</p>
                  </div>
                  <div className="flex justify-center items-center flex-1">
                    <button
                      type="button"
                      className="bg-slate-200 dark:bg-gray-700 w-[30px] h-[30px] rounded-md mr-3 flex justify-center items-center"
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                    >
                      {item.quantity === 1 ? <BsTrash /> : "-"}
                    </button>
                    {clickedItemId === item.id ? (
                      <div className="relative w-[5px] h-[5px] rounded-[50%] bg-[#9880ff] text-[#9880ff] animate-[dotFlashing_1s_linear_0.5s_infinite_alternate] before:content-[''] after:content-[''] before:inline-block after:inline-block before:absolute after:absolute before:top-0 after:top-0 before:left-[-8px] before:w-[5px] before:h-[5px] before:rounded-[50%] before:bg-[#9880ff] before:text-[#9880ff] before:animate-[dotFlashing_1s_0s_infinite_alternate] after:left-[8px] after:w-[5px] after:h-[5px] after:rounded-[50%] after:bg-[#9880ff] after:text-[#9880ff] after:animate-[dotFlashing_1s_1s_infinite_alternate]"></div>
                    ) : (
                      <div>{item.quantity}</div>
                    )}
                    <button
                      type="button"
                      className="bg-slate-200 dark:bg-gray-700 w-[30px] h-[30px] rounded-md ml-3 flex justify-center items-center"
                      onClick={() => increaseQuantity(item.id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-center items-center flex-1">
                    <span>{item["productPrice"]} ETH</span>
                  </div>
                </div>
              ))}
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
    </>
  );
};

export default ShoppingCartModal;
