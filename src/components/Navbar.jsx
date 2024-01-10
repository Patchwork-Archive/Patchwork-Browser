import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
      {menuOpen ? (
        <Menu
          isOpen={menuOpen}
          onStateChange={handleStateChange}
          left
          className="bg-accent"
        >
          <button
            className="px-4 py-1 text-white text-2xl mt-4 font-bold mb-2"
            onClick={toggleMenu}
          >
            ☰ Patchwork Archive
          </button>
          <Link
            onClick={() => setMenuOpen(false)}
            to="/"
            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
          >
            Home
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            to="/status"
            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
          >
            Status
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            to="/radio"
            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
          >
            Radio
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            to="/about"
            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
          >
            About
          </Link>
        </Menu>
      ) : null}
    <header
        className={`bg-accent py-2 md:py-4 flex flex-col md:flex-row justify-center items-center ${
            menuOpen ? "opacity-50" : ""
        }`}
    >
        <button
            className="px-4 py-1 text-white text-2xl font-bold"
            onClick={toggleMenu}
        >
            ☰
        </button>
        <div className="flex items-center justify-center w-full max-w-screen-lg px-4 mx-auto">
            <form
                action="/results"
                method="GET"
                className="flex-1 mx-2 md:mx-8 my-2 md:my-0"
            >
                <input
                    type="text"
                    name="q"
                    placeholder="Search"
                    className="w-full py-2 px-4 bg-gray-800 rounded text-white"
                ></input>
            </form>
        </div>
    </header>
    </>
  );
}

export default Navbar;
