import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <header className="bg-accent py-2 md:py-4 flex flex-col md:flex-row justify-center items-center">
                <div className="flex items-center justify-between w-full max-w-screen-lg px-4 mx-auto">
                    <button className="md:hidden px-2 py-1 text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>
                    <nav className={`flex flex-col md:flex-row items-center ${menuOpen ? 'block' : 'hidden'} md:block`}>
                        <Link to="/" className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0">Home</Link>
                        <Link to="/status" className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0">Status</Link>
                        <Link to="/radio" className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0">Radio</Link>
                    </nav>
                    <form action="/results" method="GET" className="flex-1 mx-2 md:mx-8 my-2 md:my-0">
                        <input type="text" name="q" placeholder="Search" className="w-full py-2 px-4 bg-gray-800 rounded text-white"></input>
                    </form>
                </div>
            </header>
        </>
    );
}

export default Navbar;
