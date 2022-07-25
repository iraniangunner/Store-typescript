import bitcoin from "../images/bit.png";
import bitATM from "../images/bit-ATM.png";
import wallet from "../images/wallet.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="p-2 w-[80%] md:w-[60%]">
          <h4 className="text-[2.125rem] tracking-[0.00735em] p-4">
            The payment service provider & first Cryptocurrency which do the
            economic activities in the world with support and safe structure.
          </h4>
          <p className="p-4">
            We are here to be a solution and a corner of justice to approach
            great safe transactions and non-inflationary, contains value added
            without intensive fluctuation.
          </p>
        </div>
        <div className="w-[60%] md:w-[40%] p-4">
          <img src={bitATM} alt="Bitcoin Wallet" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-[60%] order-last md:order-first md:w-[40%] p-4">
          <img src={bitcoin} alt="Bitcoin Wallet" />
        </div>
        <div className="p-2 w-[80%] md:w-[60%]">
          <h4 className="text-[2.125rem] tracking-[0.00735em] p-4">
            The payment service provider & first Cryptocurrency which do the
            economic activities in the world with support and safe structure.
          </h4>
          <p className="p-4">
            We are here to be a solution and a corner of justice to approach
            great safe transactions and non-inflationary, contains value added
            without intensive fluctuation.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="p-2 w-[80%] md:w-[60%]">
          <h4 className="text-[2.125rem] tracking-[0.00735em] p-4">
            The payment service provider & first Cryptocurrency which do the
            economic activities in the world with support and safe structure.
          </h4>
          <p className="p-4">
            We are here to be a solution and a corner of justice to approach
            great safe transactions and non-inflationary, contains value added
            without intensive fluctuation.
          </p>
        </div>
        <div className="w-[60%] md:w-[40%] p-4">
          <img src={wallet} alt="Bitcoin Wallet" />
        </div>
      </div>
      {/* {images.length && <img src={images[0]["data_url"]} alt="Bitcoin Wallet" />} */}
    </>
  );
};

export default Home;
