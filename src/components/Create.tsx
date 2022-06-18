import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BiImageAdd } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { product, setProduct } from "../State/formSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";

const CreateProduct = () => {
  // const dispatch = useDispatch();
  // const userProduct = useSelector(product);

  const navigate = useNavigate();

  interface Form {
    productTitle: string;
    productDesc: string;
    productPrice: string;
  }

  const [formValues, setFormvalues] = useState<Form>({
    productTitle: "",
    productDesc: "",
    productPrice: "",
  });

  const [images, setImages] = useState([]);

  const [isPosted, setIsPosted] = useState(false);
  const [showError, setShowError] = useState("");

  const changeHandler = (e: any): void => {
    setFormvalues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: any): void => {
    setIsPosted(true);
    e.preventDefault();

    axios
      .post("http://localhost:3001/products", {
        ...formValues,
        files: images,
      })
      .then((res) => {
        navigate("/market-place");
        setIsPosted(false);
      })
      .catch((err) => {
        setIsPosted(false);
        setShowError("Post failed try again!");
      });
  };

  // resize file for better performance
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const maxNumber = 10;


  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    try {
      const currentFile = addUpdateIndex !== undefined ? addUpdateIndex[0] : 0;
      const file = imageList[currentFile].file;
      const image = await resizeFile(file);
      imageList[currentFile].data_url = image;
    } catch (err) {
      console.log(err);
    }
    setImages(imageList as never[]);
  };

  return (
    <form
      className="w-8/12 sm:w-7/12 md:w-6/12 xl:w-5/12 my-8 p-3 mx-auto"
      onSubmit={submitHandler}
    >
      <div className="mb-[30px]">
        <label
          htmlFor="file"
          className="block text-[14px] mb-[8px] font-[400] dark:text-white"
        >
          Product Images
        </label>

        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
              <button
                type="button"
                className={`${isDragging && `text-[#be123c]`} ${
                  images.length >= maxNumber && `pointer-events-none opacity-40`
                } rounded-lg border-2 border-dashed w-full h-full border-gray-500 aspect-square flex items-center justify-center cursor-pointer hover:border-gray-800 dark:hover:border-gray-200 transition-all ease-linear duration-150`}
                onClick={onImageUpload}
                disabled={images.length >= maxNumber}
                {...dragProps}
              >
                <BiImageAdd size={30} />
              </button>

              {imageList.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="relative rounded-[4px] aspect-square"
                  >
                    <button
                      type="button"
                      className="absolute top-[4px] right-[4px] bg-[rgba(0,0,0,.32)] hover:bg-[rgba(0,0,0,.20)] dark:hover:bg-[rgba(0,0,0,.56)] transition-all rounded-[2px] flex justify-center items-center w-[1.375rem] h-[1.375rem]"
                      onClick={() => onImageRemove(index)}
                    >
                      <IoMdTrash />
                    </button>
                    <img
                      src={image["data_url"]}
                      alt="productImage"
                      className="w-full h-full rounded-[4px] object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </ImageUploading>
        <p className="text-[8px] sm:text-[14px] mt-[20px] flex items-center">
          <RiErrorWarningLine size={20} className="mr-1" />
          The number of selected photos should not exceed 10
        </p>
      </div>
      <div className="mb-[30px]">
        <label
          htmlFor="title"
          className="block text-[14px] mb-[8px] font-[400]"
        >
          Product Title
        </label>
        <input
          type="text"
          id="title"
          onChange={changeHandler}
          name="productTitle"
          placeholder="Enter product title"
          className="block w-full bg-white dark:bg-gray-800  px-[12px] py-[8px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid focus:outline-none rounded-lg"
        />
      </div>
      <div className="mb-[30px]">
        <label
          htmlFor="title"
          className="block text-[14px] mb-[8px] font-[400]"
        >
          Product Price
        </label>
        <input
          type="text"
          id="title"
          onChange={changeHandler}
          name="productPrice"
          placeholder="Enter product price"
          className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[8px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid focus:outline-none rounded-lg"
        />
      </div>
      <div className="mb-[30px]">
        <label
          htmlFor="desc"
          className="block text-[14px] mb-[8px] font-[400]"
        >
          Description
        </label>
        <TextareaAutosize
          id="desc"
          onChange={changeHandler}
          minRows={8}
          maxRows={10}
          name="productDesc"
          placeholder="Explain your product"
          className="block w-full resize-none bg-white dark:bg-gray-800 px-[12px] py-[8px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid focus:outline-none rounded-lg"
        />
      </div>
      <div className="mb-[30px] flex justify-center items-center">
        {!isPosted ? (
          <button
            type="submit"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            Submit
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              role="status"
              className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        )}
      </div>
      {showError ? <p className="my-2 text-center">{showError}</p> : null}
    </form>
  );
};

export default CreateProduct;
