import { FaLinkedin, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header className="bg-slate-200 p-3 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="font-bold text-sm sm:text-xl">
          <span className="text-slate-500">Rent</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-md flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent sm:w-64 text-slate-700"
          />
          <FaSearch className="text-slate-500 ml-2" />
        </form>
        <ul className="flex gap-2 font-bold text-sm sm:text-lg sm:font-medium text-slate-600">
          <Link to="/">
            <li className="hidden sm:inline-block cursor-pointer hover:text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline-block cursor-pointer hover:text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="cursor-pointer hover:text-slate-700 hover:underline">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};
