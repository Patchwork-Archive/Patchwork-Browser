import { useLocation } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import PageSwitcher from "../components/PageSwitcher";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

function SearchResultPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const page = new URLSearchParams(search).get("page") || 1;

  useEffect(() => {
    const helmetElements = document.querySelectorAll('[data-react-helmet]')
    helmetElements.forEach(el => {
      el.removeAttribute('data-react-helmet')
    })
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
      <PageSwitcher />
      <h2 className="text-2xl text-white font-bold mb-3 mt-6 flex justify-center">
        Search Results
      </h2>
      <SearchResults
        pageNumber={page}
        apiUrl={`https://archive.pinapelz.moe/api/search/results?q=${query}&page=${page}`}
      />
      <PageSwitcher />
    </>
  );
}

export default SearchResultPage;
