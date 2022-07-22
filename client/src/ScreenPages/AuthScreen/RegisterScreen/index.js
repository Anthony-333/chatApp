import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../Actions/AuthAction";

function RegisterScreen() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const [data, setData] = useState({
    username: "",
    name: "",
    password: "",
    confirmpass: "",
  }); // set initial value to empty

  const [confirmPass, setConfirmPass] = useState(true);
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    //capture the textbox data and store to state
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password === data.confirmpass) {
      //if confirm pass is not equal setconfirmPass state to false
      dispatch(signUp(data));
      setSuccess(false);
    } else {
      setConfirmPass(false);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-3 p-5 bg-white">
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Register
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <span
                style={{
                  display: confirmPass ? "none" : "block",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Confirm password is not the same.
              </span>
              <span
                style={{
                  display: success ? "none" : "block",
                  textAlign: "center",
                  color: "green",
                }}
              >
                Registration success!
              </span>
              <div className="pt-3">
                <label htmlFor="username-text" className="sr-only">
                  Username
                </label>
                <input
                  id="username-text"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
              <div className="pt-3">
                <label htmlFor="firstname-text" className="sr-only">
                  Name
                </label>
                <input
                  id="firstname-text"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>

              <div className="pt-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>

              <div className="pt-3">
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmpass"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={data.confirmpass}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={loading ? true : false}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign up
              </button>
            </div>
            <div className="text-sm flex justify-center">
              <a>Already have account?</a>
              <Link to="/">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterScreen;
