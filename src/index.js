import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter} from "react-router-dom";

// const router  = createBrowserRouter([
//   {
//     path:"/",
//     element:<div>hello</div>
//   },
//   {
//     path:"/archive",
//     element:<></>
//   }
// ])
// const location = useLocation();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
);

