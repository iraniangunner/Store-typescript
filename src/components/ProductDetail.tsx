import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProductDetails(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="min-h-[80vh]">
      {Object.keys(productDetails).length ? (
        <>
          <h1>{productDetails["productTitle"]}</h1>
          <h1>{productDetails["productPrice"]}</h1>
          <h1>{productDetails["productDesc"]}</h1>
        </>
      ) : null}
    </div>
  );
};

export default ProductPage;
