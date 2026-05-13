import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EndOfArchivalModal() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const dismissed = localStorage.getItem("endOf_archival_dismissed");
        if (!dismissed) setOpen(true);
    }, []);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    const handleDismiss = () => {
        localStorage.setItem("endOf_archival_dismissed", "1");
        setOpen(false);
        navigate("/");
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="End of archival announcement"
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-9999 p-4"
        >
            <div className="max-w-3xl w-full bg-linear-to-b from-slate-900 to-slate-800 text-white rounded-lg p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-48 h-48 shrink-0">
                  <img
                      src="otsu.webp"
                      alt="Announcement"
                      className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-semibold mb-2">Otsu!</h2>
                    <p className="text-slate-200 mb-4">
                        As previously announced, archival has stopped. Due to rising storage costs, only content that is unavailable
                        from Ragtag Archive and YouTube will be kept and served.
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <button
                            onClick={handleDismiss}
                            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md font-semibold"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EndOfArchivalModal;
