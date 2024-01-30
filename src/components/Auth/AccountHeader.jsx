import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AccountHeader.module.css';

const AccountHeader = () => {
  return (
    <div className="max-w-screen h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-col md:w-1/2 w-[45%] bg-blue-900 h-screen justify-center items-start">
        <div className="flex flex-col items-start justify-start m-5">
          <div className={`text-white text-6xl font-bold lg:${styles.typing}`}>
            Welcome to the{' '}
          </div>

          <div
            className={`mt-8 mb-8 text-white text-4xl font-semibold align-bottom ${styles.typing} ${styles.typingDelayed1}`}
          >
            Tran
            <span className="text-amber-700 text-6xl font-bold align-middle">
              X
            </span>
            Energy
          </div>

          <div className={`text-white text-2xl font-semibold pb-4`}>ESG</div>
          <div className={`text-white text-2xl font-semibold pb-4`}>
            Management
          </div>
          <div className={`text-white text-2xl font-semibold pb-4`}>
            Portal.
          </div>
        </div>
        <br />
        <div className={`w-auto text-xl/loose text-white px-5`}>
          Empower ESG success with TranXEnergy's cutting-edge management portal
        </div>
      </div>
      <Outlet className="w-[100%]" />
    </div>
  );
};

export default AccountHeader;
