import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Screens import
import LoginScreen from "./ScreenPages/AuthScreen/LoginScreen";
import RegisterScreen from "./ScreenPages/AuthScreen/RegisterScreen";
import HomeScreen from "./ScreenPages/HomeScreen";
function Router() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="login" />}
        />
        <Route
          path="/home"
          element={user ? <HomeScreen /> : <Navigate to="../login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="../home" /> : <LoginScreen />}
        />
        <Route path="/register" element={<RegisterScreen />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
