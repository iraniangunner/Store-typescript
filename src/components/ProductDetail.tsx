import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { createObjectURL, base64StringToBlob } from "blob-util";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductPage = () => {
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

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProductDetails(res.data))
      .catch((err) => setIsLoaded(false));
  }, []);
  return (
    <div className="w-full xl:w-10/12 p-3 sm:p-5 mx-auto min-h-[80vh]">
      {productDetails.files.length && isLoaded ? (
        <div className="flex flex-col items-center md:flex-row p-6">
          <div className="w-[80%] md:w-[40%]">
            <Carousel>
              {productDetails["files"].map((item, index) => {
                return (
                  <div className="aspect-square" key={index}>
                    <img
                      src={item["data_url"]}
                      loading="lazy"
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
            <button className="mt-10 px-4 py-2 rounded-md bg-red-500 text-white">
              Add to Cart
            </button>
          </div>
        </div>
      ) : !productDetails.files.length && isLoaded ? (
        <p>Data is loading...</p>
      ) : (
        <p>Internal server error!</p>
      )}
    </div>
  );
};

export default ProductPage;
