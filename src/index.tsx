import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';

const HomePage = lazy(() => import('./components/Home/HomePage'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Suspense>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
