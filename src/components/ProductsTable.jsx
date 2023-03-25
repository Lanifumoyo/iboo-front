import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import config from '../config';



function ProductsTable(props){

  const [data, setData] = useState([]);

  function search(event){
    event.preventDefault()
    let query = document.getElementById("default-search").value
    fetch(`${config.apiBack}/products?searchParam=${query}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => toast.error("Uppps... try again later, please"));
  }

  useEffect(() => {
    fetch(`${config.apiBack}/products`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => toast.error("Uuups.. we couldn't load your products"));
  }, []);

  return(
    <div className="w-full flex justify-center rounded">

      <div className="w-5/6">

        <div className="searcher-container m-5 w-full border-none flex flex-col content-center items-center">
          <form className="w-1/2" id="product-searcher">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input type="search" id="default-search"
                     className="block w-full p-4 pl-10 text-sm text-gray-900 border border-blue-400 rounded-lg focus:ring-fuchsia-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 bg-white"
                     placeholder="Search your product by id" required />
              <button onClick={search}
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search
              </button>
            </div>
          </form>
        </div>

        <table className="table-auto w-full rounded border-spacing-2 text-center bg-white text-xl ">
          {/*<thead  className={`border-b-4 h-10 bg-[${props.views[0]["color"]}]`}>*/}
          <thead  className={`border-b-2 h-20`}>
          <tr className="text-2xl">
            <th className="text-left px-5">ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Description</th>
            <th>Weight</th>
            <th>Avaiable</th>
          </tr>
          </thead>
          <tbody>
          {data.map(product => (
            <tr className="h-16" key={product.id}>
              <td className="text-left pl-5">{product.id}</td>
              <td>{product.product_type}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.weight}</td>
              <td>
                <div className="flex flex-row  items-center">
                  <div className="flex flex-row content-center items-center m-auto">
                    <FontAwesomeIcon icon={faCircle} color={product["enabled"] ? "green" : "red"}/>
                    <p className="ml-2">
                      {product["enabled"] ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable