import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Toast } from "./components/common/toast/Toast.jsx";

const Login = lazy(() => import("./components/admin/Login.jsx"));
const Layout = lazy(() => import("./components/shared/Layout.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Users = lazy(() => import("./pages/users/Users.jsx"));
const Subscription = lazy(() => import("./pages/subscriptions/SubscriptionManager.jsx"));
const PlanManager = lazy(() => import("./pages/subscription_plan/PlanManager.jsx"));
const ServiceManager = lazy(()=>import("./pages/plan_service/ServiceManager.jsx"))

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router basename="/admin">
      <Toast />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public route must come first */}
          <Route path="/login" element={<Login />} />

          {/* Root index redirect */}
          <Route
            index
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Protected routes */}
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="subscriptions" element={<Subscription />} />
              <Route path="plans" element={<PlanManager />} />
              <Route path="services" element={<ServiceManager />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
