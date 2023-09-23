import RadioPlayer from "../components/RadioPlayer";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

function RadioPage() {

  useEffect(() => {
    const helmetElements = document.querySelectorAll("[data-react-helmet]");
    helmetElements.forEach((el) => {
      el.removeAttribute("data-react-helmet");
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Patchwork Archive</title>
        <meta
          name="title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          name="description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <meta property="og:title" content="Patchwork Archive" />
        <meta
          property="og:image"
          content={`${window.location.origin}/favicon.png`}
        />
        <meta
          property="og:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`${window.location.origin}`} />
        <meta
          property="twitter:title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          property="twitter:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:creator" content="@pinapelz" />
      </Helmet>
      <div className="mt-4 text-lg">
        <RadioPlayer />
      </div>
    </>
  );
}
export default RadioPage;
