import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css';
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Posts from './pages/Posts';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
