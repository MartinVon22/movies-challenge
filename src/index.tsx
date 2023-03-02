import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './components/Home/Home';
import { AppContextProvider } from './context/AppContext';

const Home = lazy(() => import('./components/Home/Home'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
