import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './components/UserDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/", 
        element: <Login/>
      },
      {
        path: "/register",
        element: <Registration/>
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <Outlet/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/user",
            element: <UserDashboard/>
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
