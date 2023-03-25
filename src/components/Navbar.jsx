import IbooLogo from '../images/iboo_logo.jpg';
function Navbar(){

  return(
    <nav className="bg-black border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://ibooagency.com/" className="flex items-center">
          <img src={IbooLogo} alt="Iboo agecy" className="w-1/6"/>
          <span className="self-center text-xl font-semibold whitespace-nowrap">Flowbite</span>
        </a>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm text-white md:font-medium md:border-0 bg-dark md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#"
                 className=" rounded text-blue-500 text-xl"
                 aria-current="page">Index</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;