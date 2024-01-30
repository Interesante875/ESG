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
import ForgotPassword from './pages/Auth/ForgotPassword';
import InfoSuccess from './pages/Auth/InfoSuccess';
import ResetPassword from './pages/Auth/ResetPassword';
import SuccessReset from './pages/Auth/SuccessReset';
import CompanyInfo1 from './pages/Auth/CompanyInfo1';
import CompanyInfo2 from './pages/Auth/CompanyInfo2';
import CompanyInfo3 from './pages/Auth/CompanyInfo3';
import CompanyInfo4 from './pages/Auth/CompanyInfo4';

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
    path: '/company-info-i',
    element: <CompanyInfo1 />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/company-info-ii',
    element: <CompanyInfo2 />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/company-info-iii',
    element: <CompanyInfo3 />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/company-info-iv',
    element: <CompanyInfo4 />,
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
      {
        path:'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path:'info-success',
        element: <InfoSuccess />,
      },
      {
        path:'reset-password',
        element: <ResetPassword />,
      },
      {
        path:'success-reset',
        element: <SuccessReset />,
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
