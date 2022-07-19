import { useState } from "react";
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
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

const CreateProduct = () => {
  // const dispatch = useDispatch();
  // const userProduct = useSelector(product);

  const [images, setImages] = useState([]);
  const [isPosted, setIsPosted] = useState<boolean>(false);

  const navigate = useNavigate();

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

  interface MyFormValues {
    productTitle: string;
    productPrice: string;
    productDesc: string;
    terms: boolean;
  }

  const initialValues: MyFormValues = {
    productTitle: "",
    productPrice: "",
    productDesc: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    productTitle: Yup.string()
      .required("Title is required!")
      .min(6, "Must be more than 6 characters!"),
    productPrice: Yup.number()
      .positive("Must be more than 0")
      .required("Price is required!"),
    productDesc: Yup.string()
      .min(10, "Must be more than 10 characters!")
      .required("Description is required!"),
    terms: Yup.boolean()
      .required("The terms and conditions must be accepted!")
      .oneOf([true], "The terms and conditions must be accepted!"),
  });

  return (
    <div className="w-8/12 sm:w-7/12 md:w-6/12 xl:w-5/12 my-8 p-3 mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={(values) => {
          setIsPosted(true);
          axios
            .post("http://localhost:3001/products", {
              ...values,
              files: images,
            })
            .then((res) => {
              navigate("/market-place");
              toast.success("Successfully added to market!");
              setIsPosted(false);
            })
            .catch((err) => {
              setIsPosted(false);
              toast.error("Server error please try again!");
            });
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
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
                  maxFileSize={4000000}
                  resolutionWidth={600}
                  resolutionHeight={600}
                  resolutionType={"more"}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    // write your building UI
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
                        <button
                          type="button"
                          className={`${isDragging && `text-[#be123c]`} ${
                            images.length >= maxNumber &&
                            `pointer-events-none opacity-40`
                          } rounded-lg border-2 border-dashed w-full h-full
                 border-gray-500 aspect-square flex items-center justify-center cursor-pointer hover:border-gray-800 dark:hover:border-gray-200 transition-all ease-linear duration-150`}
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
                      {errors && (
                        <div className="mt-2 text-sm text-red-400">
                          {errors.acceptType && (
                            <span>Your selected file type is not allow</span>
                          )}
                          {errors.maxFileSize && (
                            <span>Selected file size exceed maxFileSize</span>
                          )}
                          {errors.resolution && (
                            <span>
                              Selected file is not match your desired resolution
                            </span>
                          )}
                        </div>
                      )}
                    </>
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
                  {...formik.getFieldProps("productTitle")}
                  name="productTitle"
                  placeholder="Enter product title"
                  className="block w-full bg-white dark:bg-gray-800  px-[12px] py-[8px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid focus:outline-none rounded-lg"
                />
                {formik.errors.productTitle && formik.touched.productTitle && (
                  <div className="text-red-400 text-sm mt-2">
                    {formik.errors.productTitle}
                  </div>
                )}
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
                  {...formik.getFieldProps("productPrice")}
                  name="productPrice"
                  placeholder="Enter product price"
                  className="block w-full bg-white dark:bg-gray-800 px-[12px] py-[8px] text-[#24292f] dark:text-slate-50 text-[14px] border border-solid focus:outline-none rounded-lg"
                />
                {formik.errors.productPrice && formik.touched.productPrice && (
                  <div className="text-red-400 text-sm mt-2">
                    {formik.errors.productPrice}
                  </div>
                )}
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
                  {...formik.getFieldProps("productDesc")}
                  name="productDesc"
                  minRows={8}
                  maxRows={10}
                  placeholder="Explain your product"
                  className="block w-full resize-none bg-white dark:bg-gray-800 px-[12px] py-[8px] text-black dark:text-slate-50 text-[14px] border border-solid focus:outline-none rounded-lg"
                />
                {formik.errors.productDesc && formik.touched.productDesc && (
                  <div className="text-red-400 text-sm mt-2">
                    {formik.errors.productDesc}
                  </div>
                )}
              </div>
              <div className="mb-[30px]">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="link-checkbox"
                    name="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultChecked={formik.values.terms}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-500 hover:underline ml-1"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>
                {formik.errors.terms && formik.touched.terms && (
                  <div className="text-red-400 text-sm mt-2">
                    {formik.errors.terms}
                  </div>
                )}
              </div>
              <div className="mb-[30px] flex justify-center items-center">
                {!isPosted ? (
                  <button
                    disabled={!formik.isValid}
                    type="submit"
                    className={`py-2.5 px-5 text-md font-medium text-black bg-white rounded-lg w-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center ${
                      !formik.isValid && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Create
                  </button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="py-2.5 px-5 text-md font-medium opacity-50 cursor-not-allowed text-gray-900 bg-white rounded-lg w-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center"
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
                    Please wait...
                  </button>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateProduct;
