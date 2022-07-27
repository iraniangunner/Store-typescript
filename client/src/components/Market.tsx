import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { FaEthereum } from "react-icons/fa";

const MarketPlace = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products/")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main className="w-10/12 my-8 p-3 mx-auto min-h-[80vh]">
        <div className="w-full p-6 flex flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any, index: number) => (
            <Loader key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="w-10/12 my-8 p-3 mx-auto min-h-[80vh]">
        <p>Internal server error!</p>
      </main>
    );
  }

  return (
    <main className="w-10/12 my-8 p-3 mx-auto min-h-[80vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
        {products.map((item) => {
          return (
            <div className="p-[8px] w-full" key={item["id"]}>
              <Link
                to={`/product-details/${item["id"]}`}
                className="flex justify-between w-full h-full bg-slate-100 dark:bg-gray-800 rounded-[4px] border border-solid border-[#ccc] dark:border-none hover:shadow-md transition-all p-4"
              >
                <ProductCard
                  productLinkAddress={`/product-details/${item["id"]}`}
                  productName={item["productTitle"]}
                  productPrice={item["productPrice"]}
                  productDesc={item["productDesc"]}
                  productImageUrl={item["files"][0]["data_url"]}
                />
                {/* <div className="flex flex-col rounded-[4px] w-full">
                  <div className="relative">
                    <LazyLoadImage
                      src={item["files"][0]["data_url"]}
                      alt="image"
                      className="w-full object-cover rounded-[4px] aspect-square"
                    />
                    <div className="w-[50px] h-[50px] rounded-full absolute left-[50%] translate-x-[-50%] bottom-[-25px] p-[2px] border border-solid border-[#ccc] bg-slate-100 dark:bg-gray-800">
                      <LazyLoadImage
                        src={item["files"][0]["data_url"]}
                        alt="image"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col pt-4 mt-4">
                    <p className="text-gray-900 dark:text-slate-100 mb-2">
                      {item["productTitle"]}
                    </p>
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex flex-col mb-3 mr-3">
                        <p className="text-[#62666d] dark:text-slate-400 mb-1 text-sm">
                          Current bid
                        </p>
                        <p className="text-gray-900 dark:text-slate-100 flex items-center">
                          <FaEthereum className="mr-1" />
                          {item["productPrice"]} ETH
                        </p>
                      </div>
                      <Link
                        to={`/product-details/${item["id"]}`}
                        className="inline-flex items-center max-w-full py-2 px-3 text-sm font-medium text-center text-slate-100 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Place a bid
                        <svg
                          className="ml-2 -mr-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div> */}
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MarketPlace;
