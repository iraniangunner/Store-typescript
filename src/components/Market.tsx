import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const MarketPlace = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products/")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="w-10/12 my-8 p-3 mx-auto min-h-[80vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
        {images.length
          ? images.map((item) => {
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
            })
          : null}
      </div>
    </main>
  );
};

export default MarketPlace;
