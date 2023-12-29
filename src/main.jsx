import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VideoPage from "./pages/VideoPage";
import Navbar from "./components/Navbar";
import SearchResultPage from "./pages/SearchResultPage";
import ChannelPage from "./pages/ChannelPage";
import StatusPage from "./pages/StatusPage";
import RadioPage from "./pages/RadioPage";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";

const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider context={helmetContext}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/watch" element={<VideoPage />} />
        <Route path="/results" element={<SearchResultPage />} />
        <Route path="/channel/:channelID" element={<ChannelPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);
