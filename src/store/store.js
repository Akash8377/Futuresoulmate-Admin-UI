import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/admin/slice/authSlice";
import headingReducer from "../reducers/HeadingSlice/headingSlice";
import usersReducer from "../pages/users/slice/usersSlice";
import subscriptionReducer from "../pages/subscriptions/slice/subscriptionSlice";
import planReducer from "../pages/subscription_plan/slice/planSlice";
import conversationsReducer from "../pages/conversations/slice/conversationSlice";
import notificationsReducer from "../pages/notifications/slice/notificationSlice";
import serviceReducer from "../pages/plan_service/slice/serviceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    heading: headingReducer,
    plans: planReducer,
    users: usersReducer,
    subscriptions: subscriptionReducer,
    conversations: conversationsReducer,
    notifications: notificationsReducer,
    services: serviceReducer,
  },
});

export default store;
