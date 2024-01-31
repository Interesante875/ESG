import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { SignUp, SignIn, SignOut } from './pages/Auth';
import ErrorPage from './pages/Error/ErrorPage';
import AccountHeader from './components/Auth/AccountHeader';
import HomePage from './pages/HomePage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import {
  Statistics,
  Feedback,
  ScopeI,
  ScopeII,
  ScopeIII,
  Subscription,
  Settings,
  UsersList,
  Help,
} from './pages/Dashboard';
import TotalCarbonEmission from './pages/Dashboard/TotalCarbonEmission';
import EmployeeFootprint from './pages/Dashboard/EmployeeFootprint';
import CarbonOffset from './pages/Dashboard/CarbonOffset';
import ChangeInEmission from './pages/Dashboard/ChangeInEmission';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/sign-out',
    element: <SignOut />,
    errorElement: <ErrorPage />,
  },
  {
    element: <AccountHeader />,
    errorElement: <ErrorPage />,

    children: [
      // {
      //   index: true, // This is for /account/
      //   element: <Navigate to="/account/sign-in" />,
      // },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'main',
        element: <Statistics />,
      },
      {
        path: 'scope-i',
        element: <ScopeI />,
      },
      {
        path: 'scope-ii',
        element: <ScopeII />,
      },
      {
        path: 'scope-iii',
        element: <ScopeIII />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'subscription',
        element: <Subscription />,
      },
      {
        path: 'userlist',
        element: <UsersList />,
      },
      {
        path: 'help',
        element: <Help />,
      },

      {
        path: 'total-carbon-emission',
        element: <TotalCarbonEmission />,
      },
      {
        path: 'employee-carbon',
        element: <EmployeeFootprint />,
      },
      {
        path: 'offset',
        element: <CarbonOffset />,
      },
      {
        path: 'change-in-emission',
        element: <ChangeInEmission />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
