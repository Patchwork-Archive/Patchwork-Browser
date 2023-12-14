import { useLocation } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import PageSwitcher from "../components/PageSwitcher";

function SearchResultPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const page = new URLSearchParams(search).get("page") || 1;

  return (
    <>
      <PageSwitcher />
      <h2 className="text-2xl text-white font-bold mb-3 mt-6 flex justify-center">
        Search Results
      </h2>
      <SearchResults
        pageNumber={page}
        apiUrl={`https://patchwork-backend.vercel.app/api/search/results?q=${query}&page=${page}`}
      />
      <PageSwitcher />
    </>
  );
}

export default SearchResultPage;
