import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 absolute top-0 w-full z-50 text-white">

      <h1 className="text-lg font-bold cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition duration-300">
        Zero Code AI Dashboard Builder
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-purple-400">
          Home
        </Link>

        <Link to="/features" className="hover:text-purple-400">
          Features
        </Link>

        <Link to="/pricing" className="hover:text-purple-400">
          Pricing
        </Link>

        <Link
          to="/auth"
          className="bg-purple-600 px-5 py-2 rounded-full hover:bg-purple-700"
        >
          Sign Up
        </Link>

      </div>
    </nav>
  );
}