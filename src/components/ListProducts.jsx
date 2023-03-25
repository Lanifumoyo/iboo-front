import ProductsTable from "./ProductsTable";
import ViewProducts from "./ViewProducts";
import {useState} from "react";
import UpdateView from "./UpdateView";
import { motion } from "framer-motion"
import CreateProduct from "./CreateProduct";


function ListProducts(){

  const [actualView,setActualView] = useState(0)
  const [changeView,setChangeView] = useState({
    0: {
      "component": <ProductsTable/>,
    },
    1: {
      "component": <ViewProducts />,
    },
    2: {
      "component": <UpdateView />,
    },
    3:{
      "component": <CreateProduct />,
    }
  })
  return (
    <div className="columns-1">
      <h1 className="text-5xl w-full mx-2 my-5 font-extrabold text-center">
        Products section
      </h1>
      <div className="products-page ">
        <div className="headers h-20">
          <div className="pl-2 h-full">
            <ul className="flex flex-row items-end h-full w-1/2">
              <li onClick={()=>{setActualView(0)}} className="parallelogram h-1/2 w-1/6 rounded bg-blue-500 flex items-end px-3 text-xl text-white hover:h-3/4 hover:w-2/6 cursor-pointer">
                <h3 className="text-2xl hover:text-4xl hover:pb-2 h-full w-full flex items-end">View all</h3>
              </li>
              <li onClick={()=>{setActualView(1)}} className="parallelogram h-1/2 w-1/6 rounded flex items-end px-3 bg-blue-400 text-xl text-white hover:h-3/4 hover:w-2/6 cursor-pointer">
                <h3 className="text-2xl hover:text-4xl hover:pb-2 h-full w-full flex items-end">Search</h3>
              </li>
              <li onClick={()=>{setActualView(2)}} className="parallelogram h-1/2 w-1/6 rounded flex items-end px-3 bg-blue-300 text-xl text-white hover:h-3/4 hover:w-2/6 cursor-pointer">
                <h3 className="text-2xl hover:text-4xl hover:pb-2 h-full w-full flex items-end">Update</h3>
              </li>
              <li onClick={()=>{setActualView(3)}} className="parallelogram h-1/2 w-1/6 rounded flex items-end px-3 bg-blue-200 text-xl text-white hover:h-3/4 hover:w-2/6 cursor-pointer">
                <h3 className="text-2xl hover:text-4xl hover:pb-2 h-full w-full flex items-end">Create</h3>
              </li>
            </ul>
          </div>
        </div>
        <div className={`view-content w-full rounded border-solid border-2 border-[${changeView[0]["color"]}]`}>
          {changeView[actualView]["component"]}
        </div>
      </div>
    </div>
  );
}

export default ListProducts;