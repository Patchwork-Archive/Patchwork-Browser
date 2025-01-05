function Footer() {
    return (
        <footer>
            <h1 className="justify-center text-gray-300 font-bold flex py-1">
                Made with ⚙️ by&nbsp;
                <a
                    className="hover:underline"
                    rel="noreferrer"
                    target="_blank"
                    href="https://pinapelz.moe"
                >
                    Pinapelz
                </a>
            </h1>
            <h2 className="justify-center text-gray-300 flex py-1 underline">
                <a
                    className="hover:scale-110"
                    rel="noreferrer"
                    target="_blank"
                    href="https://ko-fi.com/pinapelz"
                >
                    Support operating costs
                </a>
            </h2>
            <a
                href="https://github.com/Patchwork-Archive/"
                className="justify-center text-gray-300 flex py-2 hover:underline"
            >
                Source Code
            </a>
        </footer>
    );
}
export default Footer;
