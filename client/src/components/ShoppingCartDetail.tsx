import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";

const ShoppingCartDetail = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [clickedItemId, setClickedItemId] = useState<number>(-1);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cart")
      .then((res) => {
        props.setQuantity(
          res.data
            .map((item: any) => item.quantity)
            .reduce((acc: number, curr: number) => acc + curr, 0)
        );
        props.setCartProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="w-full xl:w-10/12 p-3 sm:p-5 mx-auto min-h-[80vh]">
        <p>Data is loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full xl:w-10/12 p-3 sm:p-5 mx-auto min-h-[80vh]">
        <p>Internal server error!</p>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-10/12 p-3 sm:p-5 mx-auto min-h-[80vh]">
      {props.cartProducts.length ? (
        <main className="flex flex-col md:flex-row md:items-start">
          <section className="w-full md:w-[60%] border rounded-md">
            {props.cartProducts.map((item: any, index: number) => (
              <div
                className={`flex ${
                  index !== props.cartProducts.length - 1 && "border-b"
                }  p-4 mt-2`}
                key={index}
              >
                <div className="flex flex-col">
                  <img
                    src={item["files"][0]["data_url"]}
                    className="w-[100px] h-[100px] object-cover"
                  />

                  <div className="flex items-center mt-5">
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
                </div>
                <div className="flex flex-col ml-5">
                  <p className="text-sm mt-1">{item["productTitle"]}</p>
                  <span>
                    {(item["productPrice"] * item.quantity).toFixed(2)} ETH
                  </span>
                </div>
              </div>
            ))}
          </section>
          <section className="w-full md:w-[40%] md:ml-4 mt-4 md:mt-0 border rounded-md p-3">
            <p className="mt-2">Total products : {props.quantity}</p>
            <p className="mt-2">
              Total Price : &nbsp;
              {props.cartProducts
                .map((item: any) => item.quantity * item.productPrice)
                .reduce((acc: number, curr: number) => acc + curr, 0)
                .toFixed(2)}
              &nbsp; ETH
            </p>
            <button
              type="button"
              className="mt-6 px-4 py-2 w-full rounded-md bg-red-500 text-white hover:bg-red-700 transition-all text-sm"
            >
              Continue to checkout
            </button>
          </section>
        </main>
      ) : (
        <section>
          <span>Your cart is empty!</span>
        </section>
      )}
    </div>
  );
};

export default ShoppingCartDetail;
