import logo from './logo.svg';
import './App.css';
import FrontierMail from './page/FrontierMail';
import AccountActivated from './components/AccountActivated';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<FrontierMail />} />
          <Route path="/login" element={<FrontierMail />} />
          <Route path="/activated" element={<AccountActivated />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
