import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
              <Route path='/discover/:id' element={<Categorymovies/>}></Route>
            </Route>
            <Route path='/moviedetails/:movieid' element={<Moviedetails/>}></Route>
        </Routes>
    </BrowserRouter> */}
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, you can continue to use reportWebVitals as you were doing before.
reportWebVitals();
