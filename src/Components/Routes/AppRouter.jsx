import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import EnterCode from "../Auth/EnterCode";
import ResetPassword from "../Auth/ResetPassword";
import Dashboard from "../Dashboard";
import MosqueDetails from "../MosqueDetails/MosqueDetails";
import RegisterationRequests from "../RegisterationRequests/RegisterationRequests";
import ApprovedMosqueLayout from "../MosqueDetails/ApprovedMosqueLayout";
import Settings from "../Settings/Settings";
import Faqs from "../Faqs/Faqs";
import ProtectedRoutes from "./ProtectedRoutes";
import AcceptInvite from "../Auth/AcceptInvite";
import AfterAccept from "../Auth/AfterAccept";
import Feedback from "../Feedback/Feedback";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/enter-code" element={<EnterCode />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/mosque/:id"
        element={
          <ProtectedRoutes>
            <MosqueDetails />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/registeration-requests"
        element={
          <ProtectedRoutes>
            <RegisterationRequests />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/registeration-requests/mosque/:id"
        element={
          <ProtectedRoutes>
            <ApprovedMosqueLayout />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/registeration-requests/declined-mosque/:id"
        element={
          <ProtectedRoutes>
            <ApprovedMosqueLayout />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/faqs"
        element={
          <ProtectedRoutes>
            <Faqs />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoutes>
            <Feedback />
          </ProtectedRoutes>
        }
      />
      <Route path="/auth/accept-invite/:token" element={<AcceptInvite />} />
      <Route path="/auth/invite-accepted" element={<AfterAccept />} />
    </Routes>
  );
}

export default AppRouter;
