import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import ListProducts from "./components/ListProducts";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App bg-gray-50 min-h-screen">
      <ToastContainer />
      <Navbar/>
      <div className="container min-h-full mx-auto">
        <ListProducts/>
      </div>
    </div>
  );
}

export default App;
