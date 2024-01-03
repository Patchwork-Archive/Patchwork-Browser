import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function PageSwitcher({ currentPage, maxPage }) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  let page = parseInt(queryParams.get("page")) || 1;

  function goBack() {
    if (page > 1) {
      page--;
      queryParams.set("page", page.toString());
      navigate(`${location.pathname}?${queryParams.toString()}`);
      window.scrollTo(0, 0);
    }
  }

  function goForward() {
    page++;
    queryParams.set("page", page.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className="text-center mt-6">
      {maxPage == 0 ? (
        <></>
      ) : (
        <span className="text-white font-bold">
          Showing {currentPage} of {maxPage} pages
        </span>
      )
      }
      <div className="mx-2 px-4 py-2 rounded">
        {currentPage == 1 ? (
          <></>
        ) : (
          <button
            className="bg-accent text-white font-bold py-2 px-4 rounded mx-2 w-24"
            onClick={goBack}
          >
            Back
          </button>
        )}

        {currentPage == maxPage ? (
          <></>
        ) : (
          <button
            className="bg-accent text-white font-bold py-2 px-4 rounded mx-2 w-24"
            onClick={goForward}
          >
            Forward
          </button>
        )}
      </div>
    </div>
  );
}

PageSwitcher.propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
};

export default PageSwitcher;
