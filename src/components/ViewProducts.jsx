import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faDotCircle} from "@fortawesome/free-solid-svg-icons";
import ProductFinder from "./ProductFinder";
import {toast} from "react-toastify";

function ViewProducts(){

  const [product,setProduct] = useState([])

  function setProductFrom(array){
    setProduct(array)
  }

  function badRequest(){
    toast.error("Couldn't find your product")
  }

  // useEffect(() => {
  //   getProduct()
  // }, []);

  return (
    <div className="w-full flex flex-col items-center pb-5">

      <ProductFinder setProduct={setProductFrom} badRequest={badRequest}/>

      <div className="w-5/6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold ">
            Product
          </h5>
          <p className="mb-3 mt-5 text-xl">
            <b>ID:</b> {product["id"]}
          </p>

          <div className="grid grid-rows-1 grid-cols-2">
            <div>
              <p className="mb-3 my-5 text-xl">
                <b>Name:</b> {product["name"]}
              </p>
              <p className="mb-3 my-5 text-xl">
                <b>Type of product:</b> {product["product_type"]}
              </p>
            </div>
            <div>
              <p className="mb-3 my-5 text-xl">
                <b>Weight:</b> {product["weight"]}
              </p>
              <span className="flex flex-row my-5 text-xl">
                <b>Avaiable:</b>
                {product.length != 0 ? <div className="rounded-full cursor-pointer flex flex-row  items-center pl-2">
                  <FontAwesomeIcon icon={faCircle} color={product["enabled"] ? "green" : "red"}/>
                  <p className="ml-2">
                    {product["enabled"] ? "Yes" : "No"}
                  </p>
                </div> : "" }

              </span>
            </div>
          </div>

          <div className="w-100 flex flex-col text-xl">
            <b className="mb-2">Description</b>
            {product["description"]}
          </div>
        </div>
      </div>
    </div>

);
}



export default ViewProducts;