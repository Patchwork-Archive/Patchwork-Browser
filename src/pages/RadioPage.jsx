import { useState } from "react";
import HeadTags from "../components/HeadTags";

function RadioPage() {
    const m3uAPIUrl = import.meta.env.VITE_RADIO_M3U;
    const plsAPIUrl = import.meta.env.VITE_RADIO_PLS;
    const radioUrl = import.meta.env.VITE_RADIO_URL_MP3;
    const embedUrl = import.meta.env.VITE_EMBED_URL;
    const [useEmbed, setUseEmbed] = useState(!embedUrl);

    return (
        <>
            <HeadTags
                title="Patchwork Archive - Radio"
                description="Listen to a stream of all music archived on Patchwork"
                image="https://patchwork.moekyun.me/favicon.png"
                url="/playlist"
            />
            <div className="mt-4 text-white text-center">
                <h1 className="text-2xl">Patchwork Radio Beta!</h1>
                <p>
                    Listen to a stream of all music archived on Patchwork <br />
                    Synced up with everyone else listening
                    <br />
                    <br />
                    Currently being tested, expect some downtime and changes
                </p>
                {embedUrl && (
                    <a
                        className=" hover:underline text-white font-bold py-2 mt-2 px-4 mx-2 rounded cursor-pointer"
                        onClick={() => setUseEmbed(!useEmbed)}
                    >
                        {useEmbed ? "Switch to Audio Player" : "Switch to Embed Player"}
                    </a>
                )}
            </div>
            <div className="mx-auto max-w-md py-8">
                {useEmbed ? (
                    <iframe 
                        src={embedUrl} 
                        frameborder="0" 
                        allowtransparency="true" 
                        style={{width: "100%", minHeight: "150px", border: "0"}}
                    />

                ) : (
                    <audio controls autoPlay className="w-full" src={radioUrl} />
                )}
            </div>
            <div className="mt-4 text-white text-center">
                {m3uAPIUrl ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                        onClick={() => (window.location.href = m3uAPIUrl)}
                    >
                        Download M3U
                    </button>
                ) : null}
                {plsAPIUrl ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                        onClick={() => (window.location.href = plsAPIUrl)}
                    >
                        Download PLS
                    </button>
                ) : null}
            </div>
        </>
    );
}
export default RadioPage;