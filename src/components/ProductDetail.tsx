import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
      {/* <Carousel>
        {productDetails["files"].map((item) => {
          return (
            <div>
              <img src={item["data_url"]} alt="image" />
              <p className="legend">Legend 1</p>
            </div>
          );
        })}
      </Carousel> */}
    </div>
  );
};

export default ProductPage;
