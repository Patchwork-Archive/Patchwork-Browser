import HeadTags from "../components/HeadTags";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import Footer from "../components/Footer";

function AboutPage() {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch("/about.md")
            .then((res) => res.text())
            .then((text) => setMarkdown(text));
    }, []);

    return (
        <>
            <HeadTags
                title="Patchwork Archive - About"
                description="Preserving rhythm, one video at a time"
                url="playlist"
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            <div className="flex justify-center items-center py-8 px-2">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    className="prose dark:prose-invert text-white"
                >
                    {markdown}
                </Markdown>
            </div>
            <Footer />
        </>
    );
}
export default AboutPage;
