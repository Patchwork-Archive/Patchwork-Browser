import { useState } from "react";
import HeadTags from "../components/HeadTags";
import RadioPlayer from "../components/RadioPlayer";

function RadioPage() {
    const m3uAPIUrl = import.meta.env.VITE_RADIO_M3U;
    const plsAPIUrl = import.meta.env.VITE_RADIO_PLS;
    const embedUrl = import.meta.env.VITE_EMBED_URL;
    const radioUrl = import.meta.env.VITE_RADIO_URL_MP3;
    const [useEmbed, setUseEmbed] = useState(!embedUrl);

    return (
        <>
            <HeadTags
                title="Patchwork Archive - Radio"
                description="VTuber Music Radio. Listen to a stream of all music archived on Patchwork."
                url="radio"
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            {radioUrl ? (
                <>
                    <div className="mt-6 text-white text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 transition-all duration-700 ease-in-out transform hover:scale-105">
                            Patchwork Archive - VTuber Songs and Covers
                        </h1>
                        <p className="text-xl font-light leading-relaxed mb-4">
                            Listen to an endless stream of VTuber music 24/7,
                            all archived on Patchwork.
                        </p>
                        {embedUrl && (
                            <a
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 mt-4 px-6 mx-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
                                onClick={() => setUseEmbed(!useEmbed)}
                            >
                                {useEmbed
                                    ? "Hide Embed Player"
                                    : "Show Embed Player"}
                            </a>
                        )}
                    </div>

                    <div className="mx-auto max-w-xl py-8">
                        {useEmbed ? (
                            <iframe
                                src={embedUrl}
                                style={{
                                    width: "100%",
                                    minHeight: "150px",
                                    border: "0",
                                }}
                            />
                        ) : null}
                        <RadioPlayer
                            radioUrl={radioUrl}
                            m3uAPIUrl={m3uAPIUrl}
                            plsAPIUrl={plsAPIUrl}
                        />
                    </div>
                </>
            ) : null}
        </>
    );
}
export default RadioPage;
