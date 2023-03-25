import {toast} from "react-toastify";
import config from '../config';


function ProductFinder(props){

  function getProduct(event){
    event.preventDefault();
    let id = document.getElementById("default-search").value
    fetch(`${config.apiBack}/product/${id}`)
      .then(response => response.json())
      .then(data => props.setProduct(data))
      .then(data => toast.success("Product recovered successfully"))
      .catch(error => props.badRequest())
  }

  return(
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
          <button onClick={getProduct}
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFinder