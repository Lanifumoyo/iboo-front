import ProductFinder from "./ProductFinder";
import {useState} from "react";
import {toast} from "react-toastify";
import config from '../config';




function UpdateView(){

  const [productUpdate, setProductUpdate] = useState([])
  const [postProduct, setPostProduct] = useState([])

  function badRequest(){
    setProductUpdate({})
    document.getElementById("update_form").reset()
    document.getElementById("description").value = ""
    toast.error("Couldn't find your product")
  }
  function setProductFrom(array){
    setProductUpdate(array)
  }

  function onlyNumbers(event){
    const {name} = event.target

    if(name == "weight" && (/[a-zA-Z]/.test(event.key) && event.key != "Backspace")){
      event.preventDefault()
    }

  }

  function handleChange(event){
    const {name, value} = event.target
    setProductUpdate({...productUpdate,[name]:value})
  }

  function sendProductChanges(event){

    event.preventDefault()
    let prodData = {...productUpdate}
    delete prodData.id
    let id = document.getElementById("product-id").dataset.id
    fetch(`${config.apiBack}/product/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prodData),
    }).then(response => response.json())
      .then(data => toast.success("Your product was updated successfully"))
      .catch(error => toast.error("Uuups... we couldn't update your product,try again later"));
  }

  return(
    <div className="w-100 flex flex-col items-center pb-5">
      <ProductFinder setProduct={setProductFrom} badRequest={badRequest}/>
      <form className="w-5/6" id="update_form">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="w-100 px-2">
            <h5 className="mb-2 text-3xl font-bold ">
              Update your product
            </h5>
            <p className="mb-3 mt-5 text-xl" id="product-id" data-id={productUpdate["id"]}>
              <b>ID:</b> {productUpdate["id"]}
            </p>
          </div>

          <div className="grid grid-rows-1 grid-cols-2 items-center">
            <div>
              <div className="flex flex-col px-2">
                <label>Name</label>
                <input onChange={handleChange} name="name" className="rounded border-2 border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" type="text" value={productUpdate.name} required/>
              </div>
              <div className="flex flex-col px-2">
                <label>Type</label>
                <input onChange={handleChange} name="product_type" className="rounded border-2 border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" type="text" value={productUpdate.product_type} required/>
              </div>
            </div>
            <div>
              <div className="flex flex-col px-2">
                <label>Weight</label>
                <input name="weight" onKeyDown={onlyNumbers} onChange={handleChange} className="rounded border-2 border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" type="text" value={productUpdate.weight} required/>
              </div>
              <div className="flex flex-col px-2">
                <label>Avaiable</label>
                <select name="enabled" onChange={handleChange} className="rounded border-2 bg-white border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" required>
                  {Boolean(productUpdate.enabled ?? true) ? (<>
                    <option hidden></option>
                    <option selected value="true">Yes</option>
                    <option value="false">No</option>
                    </>) :(<>
                      <option hidden></option>
                      <option value="true">Yes</option>
                      <option selected value="false">No</option>
                    </>)}

                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-1 w-100 px-2">
            <div className="flex flex-col w-100">
              <label>Description</label>
              <textarea name="description" id="description" value={productUpdate.description} onChange={handleChange} className="border-2 border-sky-100 outline-none rounded" required>
              </textarea>
            </div>
          </div>

          <div className="buttons px-2 w-100 flex justify-center my-5">
            <div className="w-1/4 flex justify-around">
              <button type="submit" onClick={sendProductChanges} className="rounded bg-blue-400 text-white hover:bg-blue-500 w-2/4 h-10 text-center mx-2">Update</button>
              <button className="rounded bg-red-400 text-white hover:bg-red-500 w-2/4 h-10text-center mx-2">Remove</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateView