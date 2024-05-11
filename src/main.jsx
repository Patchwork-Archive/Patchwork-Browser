/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {lazy, Suspense} from "react";
import Navbar from "./components/Navbar";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css";

const LandingPage = lazy(() => import('./pages/LandingPage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const SearchResultPage = lazy(() => import('./pages/SearchResultPage'));
const ChannelPage = lazy(() => import('./pages/ChannelPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const PlaylistPage = lazy(() => import('./pages/PlaylistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const RadioPage = lazy(() => import('./pages/RadioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ChannelListPage = lazy(() => import('./pages/ChannelListPage'));


const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider context={helmetContext}>
    <BrowserRouter>
      <Navbar />
      {/* TODO: Make something here for Suspense API*/}
      <Suspense fallback={<div>Loading...</div>}> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/watch" element={<VideoPage />} />
          <Route path="/results" element={<SearchResultPage />} />
          <Route path="/channel/:channelID" element={<ChannelPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/channels" element={<ChannelListPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);