import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import {
  ReportBusinessTravel,
  ReportElectricVehicle,
  ReportEmployeeCommuting,
  ReportEnergyPurchase,
  ReportFugitiveEmission,
  ReportMobileCombustion,
  ReportStationaryCombustion,
} from './pages/Table';

import TotalCarbonEmission from './pages/Dashboard/TotalCarbonEmission';
import EmployeeFootprint from './pages/Dashboard/EmployeeFootprint';
import CarbonOffset from './pages/Dashboard/CarbonOffset';
import ChangeInEmission from './pages/Dashboard/ChangeInEmission';
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
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'info-success',
        element: <InfoSuccess />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'success-reset',
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
        path: 'main/total-carbon-emission',
        element: <TotalCarbonEmission />,
      },
      {
        path: 'main/employee-carbon',
        element: <EmployeeFootprint />,
      },
      {
        path: 'main/offset',
        element: <CarbonOffset />,
      },
      {
        path: 'main/change-in-emission',
        element: <ChangeInEmission />,
      },
      {
        path: 'scope-i',
        element: <ScopeI />,
      },
      {
        path: 'scope-i/stationary-combustion',
        element: <ReportStationaryCombustion />,
      },
      {
        path: 'scope-i/mobile-combustion',
        element: <ReportMobileCombustion />,
      },
      {
        path: 'scope-i/fugitive-emission',
        element: <ReportFugitiveEmission />,
      },
      {
        path: 'scope-ii',
        element: <ScopeII />,
      },
      {
        path: 'scope-ii/energy-purchase',
        element: <ReportEnergyPurchase />,
      },
      {
        path: 'scope-ii/electric-vehicle',
        element: <ReportElectricVehicle />,
      },
      {
        path: 'scope-iii',
        element: <ScopeIII />,
      },
      {
        path: 'scope-iii/business-travel',
        element: <ReportBusinessTravel />,
      },
      {
        path: 'scope-iii/employee-commuting',
        element: <ReportEmployeeCommuting />,
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
