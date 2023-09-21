import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Landing />} />
    </Routes>
    </>
  );
}

export default App;