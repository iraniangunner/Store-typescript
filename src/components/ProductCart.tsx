import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = (props: any) => {
  return (
    <div className="flex flex-col rounded-[4px] w-full">
      <div className="relative"> 
        <LazyLoadImage
          src={props.productImageUrl}
          alt="image"
          // loading="lazy"
          className="w-full object-cover rounded-[4px] aspect-square"
        />
        <div className="w-[50px] h-[50px] rounded-full absolute left-[50%] translate-x-[-50%] bottom-[-25px] p-[2px] border border-solid border-[#ccc] bg-slate-100 dark:bg-gray-800">
          <LazyLoadImage
            src={props.productImageUrl}
            alt="image"
            // loading="lazy"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col pt-4 mt-4">
        <p className="text-gray-900 dark:text-slate-100 mb-2">
          {props.productName}
        </p>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-col mb-3 mr-3">
            <p className="text-[#62666d] dark:text-slate-400 mb-1 text-sm">
              Current bid
            </p>
            <p className="text-gray-900 dark:text-slate-100 flex items-center">
              <FaEthereum className="mr-1" />
              {props.productPrice} ETH
            </p>
          </div>
          <Link
            to={props.productLinkAddress}
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
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
