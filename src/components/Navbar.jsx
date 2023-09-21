function Navbar() {
    return (
        <>
            <header className="bg-accent py-4 flex justify-center items-center">
                <div className="flex items-center justify-between w-full max-w-screen-lg px-4 mx-auto">
                    <nav className="flex items-center">
                        <a href="/" className="hover:bg-white hover:text-black py-2 px-4 rounded text-white">Home</a>
                        <a href="/status" className="hover:bg-white hover:text-black py-2 px-4 rounded text-white">Status</a>
                        <a href="/radio" className="hover:bg-white hover:text-black py-2 px-4 rounded text-white">Radio</a>
                    </nav>
                    <form action="/results" method="GET" className="flex-1 mx-8">
                        <input type="text" name="search_query" placeholder="Search" className="w-full py-2 px-4 bg-gray-800 rounded text-white"></input>
                    </form>
                </div>
            </header>
        </>
    );
}

export default Navbar;
