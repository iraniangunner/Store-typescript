import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
            <Loader />
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
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MarketPlace;
