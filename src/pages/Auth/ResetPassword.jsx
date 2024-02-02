import React, { useState, useEffect, useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function ResetPassword() {
  const [values, setValues] = useState({
    password: '',
    verify_password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showVPassword, setShowVPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const passwordRef = useRef(null);
  const verifyPasswordRef = useRef(null);

  // Detect click outside to hide password
  useEffect(() => {
    function handleClickOutside(event) {
      if (passwordRef.current && !passwordRef.current.contains(event.target)) {
        setShowPassword(false);
      }
      if (
        verifyPasswordRef.current &&
        !verifyPasswordRef.current.contains(event.target)
      ) {
        setShowVPassword(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const strongPasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const moderatePasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})'
    );

    if (strongPasswordRegex.test(values.password)) {
      setPasswordStrength('Strong');
      setSubmitDisabled(false);
    } else if (moderatePasswordRegex.test(values.password)) {
      setPasswordStrength('Moderate');
      setSubmitDisabled(true);
    } else {
      setPasswordStrength('Weak');
      setSubmitDisabled(true);
    }

    setSubmitDisabled(
      values.password !== values.verify_password ||
        passwordStrength === 'Weak' ||
        !values.password
    );
  }, [values, passwordStrength]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function handlePaste(e) {
    e.preventDefault();
    return false;
  }

  return (
    <div className="max-h-screen bg-slate-50 container px-4 sm:px-6 lg:px-8">
      <div className="h-screen flex flex-col justify-center sm:py-12">
        <div className="text-zinc-800 text-3xl sm:text-4xl font-bold leading-snug">
          Reset Password
        </div>
        <div className="text-zinc-800 mt-2 mb-6">
          Hi! Enter your new desired password. Must include uppercase,
          lowercase, number, symbol, and be at least 8 characters long.
        </div>
        <form className="w-full">
          <div className="mb-4" ref={passwordRef}>
            {/* Password input field */}
            <label htmlFor="password" className="font-bold text-zinc-800">
              New Password<span className="ml-1 text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="At least 6 characters"
                className="w-full p-2 border rounded-md"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </span>
            </div>
          </div>
          <div className="mb-4" ref={verifyPasswordRef}>
            {/* Verify password input field */}
            <label
              htmlFor="verify_password"
              className="font-bold text-zinc-800"
            >
              Re-enter New Password<span className="ml-1 text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showVPassword ? 'text' : 'password'}
                id="verify_password"
                name="verify_password"
                onChange={handleChange}
                onPaste={handlePaste}
                className="w-full p-2 border rounded-md"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowVPassword(!showVPassword)}
              >
                {showVPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </span>
            </div>
          </div>
          {passwordStrength && <div>Password strength: {passwordStrength}</div>}
          <button
            type="submit"
            disabled={submitDisabled}
            className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
