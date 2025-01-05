import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import {
    faHome,
    faBars,
    faCircleInfo,
    faRadio,
    faRecordVinyl,
    faCircleExclamation,
    faPenToSquare,
    faUser,
    faBullhorn,
    faMugSaucer
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                    className="bg-accent flex flex-col h-full"
                >
                    <button
                        className="px-4 py-1 text-white text-2xl mt-4 font-bold mb-2"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon icon={faBars} /> Patchwork Archive
                    </button>
                    <div>
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon icon={faHome} className="mr-2" />{" "}
                            Home
                        </Link>
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/channels"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                            Channels
                        </Link>
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/playlist"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon
                                icon={faRecordVinyl}
                                className="mr-2"
                            />{" "}
                            Playlist
                        </Link>
                        {import.meta.env.VITE_RADIO_URL_MP3 ? (
                            <Link
                                onClick={() => setMenuOpen(false)}
                                to="/radio"
                                className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                            >
                                <FontAwesomeIcon
                                    icon={faRadio}
                                    className="mr-2"
                                />{" "}
                                Radio
                            </Link>
                        ) : null}
                    </div>
                    <div className="mt-8">
                        <h2 className="text-white text-xl font-light px-2 mb-1">
                            Information
                        </h2>
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/announcements"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon
                                icon={faBullhorn}
                                className="mr-2"
                            />{" "}
                            Announcements
                        </Link>
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="https://ko-fi.com/pinapelz"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon
                                icon={faMugSaucer}
                                className="mr-2"
                            />{" "}
                            Ko-Fi
                        </Link>
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/status"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                className="mr-2"
                            />{" "}
                            Status
                        </Link>
                        {import.meta.env.VITE_SUBMISSION_FORM ? (
                            <Link
                                to={import.meta.env.VITE_SUBMISSION_FORM}
                                className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                            >
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="mr-2"
                                />{" "}
                                Form
                            </Link>
                        ) : null}
                        <Link
                            onClick={() => setMenuOpen(false)}
                            to="/about"
                            className="hover:bg-white hover:text-black py-2 px-4 rounded text-white my-1 md:my-0 text-lg text-left block"
                        >
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="mr-2"
                            />{" "}
                            About
                        </Link>
                    </div>
                </Menu>
            ) : null}
            <header
                className={`bg-accent py-2 md:py-4 flex flex-col md:flex-row justify-center items-center ${
                    menuOpen ? "opacity-50" : ""
                }`}
            >
                <button
                    aria-label="Toggle Sidebar Menu"
                    aria-haspopup="menu"
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className="hidden md:flex text-white text-3xl mx-4"
                    />
                </button>

                <div className="flex items-center justify-center w-full max-w-screen-lg px-4 mx-auto">
                    <button
                        aria-label="Toggle Sidebar Menu"
                        aria-haspopup="menu"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            className="md:hidden text-white text-3xl mx-4"
                        />
                    </button>
                    <form
                        action="/results"
                        method="GET"
                        className="flex-1 mx-2 md:mx-8 my-2 md:my-0 w-1/2"
                    >
                        <input
                            type="text"
                            aria-label="Search Input"
                            name="q"
                            placeholder="Search"
                            className="w-full py-2 px-4 bg-gray-800 rounded text-white"
                        ></input>
                    </form>
                </div>
                <button
                    aria-label="Return to Home Page"
                    href="/"
                    className="hover:cursor-pointer hidden md:block"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    <FontAwesomeIcon
                        icon={faHome}
                        className="text-white text-3xl mx-4"
                    />
                </button>
            </header>
        </>
    );
}

export default Navbar;
