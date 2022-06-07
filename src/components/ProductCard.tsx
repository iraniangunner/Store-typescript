import {FaEthereum} from "react-icons/fa";

const ProductCard = (props: any) => {
  return (
    <div className="flex flex-col rounded-[4px] w-full">
      <img
        src={props.productUrl}
        alt="image"
        className="w-full object-cover rounded-[4px] aspect-square"
      />
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-900 dark:text-white text-center">
          {props.productName} 
        </p>
      </div>

      <div className="flex justify-center items-center py-4">
        <p className="text-gray-900 dark:text-white flex items-center">
          <FaEthereum className="mr-1"/>
          {props.productPrice} ETH
        </p>
      </div>
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-900 dark:text-white text-center">
          {props.productDesc} 
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
