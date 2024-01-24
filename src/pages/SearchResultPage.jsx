import { useLocation } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import PageSwitcher from "../components/PageSwitcher";
import Footer from "../components/Footer";
import HeadTags from "../components/HeadTags";
import { useEffect, useState } from "react";


function SearchResultPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const page = new URLSearchParams(search).get("page") || 1;
  const [searchResultData, setSearchResultData] = useState({});
  const[error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [numResults, setNumResults] = useState(0);

  useEffect(() => {
    fetch(`https://patchwork-backend.vercel.app/api/search/results?q=${query}&page=${page}`)
    .then((response) => {
      setIsLoading(false);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setSearchResultData(data)
      setNumResults(data.results.length)
    })
    .catch((error) => setError(error));
  }, [page]); 

  if (error) {
    return <p className="text-white text-xl justify-center flex">Error: {error.message}</p>;
  }

  return (
    <>
      <HeadTags
        title={query + " - Patchwork Archive"}
        description="Preserving Cultured Rhythm For the Future"
        image="https://patchwork.moekyun.me/favicon.png"/>
      <h1 className="text-2xl text-white font-bold mb-2 mt-6 flex justify-center">
        Showing results for
      </h1>
      <i className="text-lg text-white flex justify-center">{query}</i>
      {isLoading ? (
        <p className="text-white text-xl justify-center flex">Loading...</p>
      ) : (
        <SearchResults
        results={searchResultData.results}
      />
      )}
      {
        isLoading || numResults == 0 ? (
          <></>
        ) : (
          <PageSwitcher currentPage={page} maxPage={searchResultData.pages} />
        )
      }
      <Footer />
    </>
  );
}

export default SearchResultPage;
