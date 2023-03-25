import {useState} from "react";
import {toast} from "react-toastify";
import config from '../config';
import productFinder from "./ProductFinder";


function CreateProduct(){

  const [product,setProduct] = useState([])
  function handleChange(event){
    const {name, value} = event.target
    setProduct({...product,[name]:value})
  }

  function onlyNumbers(event){
    const {name} = event.target

    if(name == "weight" && (/[a-zA-Z]/.test(event.key) && event.key != "Backspace")){
      event.preventDefault()
    }

  }

  function createProduct(event){
    event.preventDefault()
    let isValid = true;
    let form = document.getElementById("create_form");
    let inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (input.required && input.value.trim() === "") {
        input.classList.add("border-red-500");

        let errorMessage = input.parentElement.querySelector(".error-message");
        if (!errorMessage) {
          errorMessage = document.createElement("span");
          errorMessage.classList.add("text-red-500", "text-sm", "error-message");
          input.parentElement.appendChild(errorMessage);
        }

        errorMessage.textContent = "This field is required";
        isValid = false;
      } else {
        input.classList.remove("border-red-500");

        let errorMessage = input.parentElement.querySelector(".error-message");
        if (errorMessage) {
          errorMessage.remove();
        }
      }
    });
    // stop the call if form ain't valid
    if (!isValid) {
      return;
    }


    let formData = new FormData()

    for (const key in product) {
      formData.append(key,product[key])
    }
    fetch(`${config.apiBack}/product`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => toast.success(`Product created with id: ${data.id}`))
      .catch(error => {
        toast.error("Uuupsss... we couldn't create your product, try again later")
      })
  }

  return(
    <div className="w-100 flex flex-col items-center py-24">
      <form className="w-5/6" id="create_form">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="w-100 px-2">
            <h5 className="mb-2 text-3xl font-bold ">
              Create your product
            </h5>
          </div>

          <div className="grid grid-rows-1 grid-cols-2 items-center">
            <div>
              <div className="flex flex-col px-2">
                <label>Name</label>
                <input onChange={handleChange} name="name" className="rounded border-2 border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" type="text" required/>
              </div>
              <div className="flex flex-col px-2">
                <label>Type</label>
                <input onChange={handleChange} name="product_type" className="rounded border-2 border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" type="text" required/>
              </div>
            </div>
            <div>
              <div className="flex flex-col px-2">
                <label>Weight</label>
                <input name="weight" onKeyDown={onlyNumbers} onChange={handleChange} className="rounded border-2 border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" type="text" required/>
              </div>
              <div className="flex flex-col px-2">
                <label>Avaiable</label>
                <select name="enabled" onChange={handleChange} className="rounded border-2 bg-white border-sky-100 outline-none py-2 pl-2 text-sm text-gray-900" required>
                    <option selected value="true">Yes</option>
                    <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-1 w-100 px-2">
            <div className="flex flex-col w-100">
              <label>Description</label>
              <textarea name="description" id="description" onChange={handleChange} className="border-2 border-sky-100 outline-none rounded" required>
              </textarea>
            </div>
          </div>

          <div className="buttons px-2 w-100 flex justify-center my-5">
            <div className="w-1/4 flex justify-around">
              <button type="submit" onClick={createProduct} className="rounded bg-blue-400 text-white hover:bg-blue-500 w-2/4 h-10 text-center mx-2">Create</button>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}

export default CreateProduct;