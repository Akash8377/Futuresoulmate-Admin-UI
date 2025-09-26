import { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toast } from "./components/common/toast/Toast.jsx";

const Login = lazy(() => import("./components/admin/Login.jsx"));
const Layout = lazy(() => import("./components/shared/Layout.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Users = lazy(() => import("./pages/users/Users.jsx"));
const Subscription = lazy(()=> import("./pages/subscriptions/SubscriptionManager.jsx"))
const PlanManager = lazy(()=> import("./pages/subscription_plan/PlanManager.jsx"))

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Router>
      <Toast/>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Public route for login */}
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="subscriptions" element={<Subscription />} />
              <Route path="plans" element={<PlanManager />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
