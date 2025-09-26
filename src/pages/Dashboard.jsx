import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "./users/slice/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setHeadingTitle } from "../reducers/HeadingSlice/headingSlice";
import { fetchSubscriptions } from "./subscriptions/slice/subscriptionSlice";
import { fetchPlans } from "./subscription_plan/slice/planSlice";
import { fetchAllConversations } from "./conversations/slice/conversationSlice";
import { fetchAllNotifications } from "./notifications/slice/notificationSlice";
import DashboardCharts from "./DashboardCharts";

// Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const { plans } = useSelector((state) => state.plans);
  const { notifications } = useSelector((state) => state.notifications);
  const { conversations } = useSelector((state) => state.conversations);

  useEffect(() => {
    dispatch(setHeadingTitle("Dashboard"));
    dispatch(fetchAllUsers());
    dispatch(fetchSubscriptions());
    dispatch(fetchPlans());
    dispatch(fetchAllConversations());
    dispatch(fetchAllNotifications());
  }, [dispatch]);

  // Process and analyze the actual data
  const analyticsData = useMemo(() => {
    const usersArray = Array.isArray(users) ? users : [];
    const subscriptionsArray = Array.isArray(subscriptions) ? subscriptions : [];
    const plansArray = Array.isArray(plans) ? plans : [];
    const conversationsArray = Array.isArray(conversations) ? conversations : [];
    const notificationsArray = Array.isArray(notifications) ? notifications : [];

    // User Demographics
    const genderDistribution = usersArray.reduce((acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});

    const religionDistribution = usersArray.reduce((acc, user) => {
      acc[user.religion] = (acc[user.religion] || 0) + 1;
      return acc;
    }, {});

    const countryDistribution = usersArray.reduce((acc, user) => {
      acc[user.country] = (acc[user.country] || 0) + 1;
      return acc;
    }, {});

    const maritalStatusDistribution = usersArray.reduce((acc, user) => {
      acc[user.marital_status] = (acc[user.marital_status] || 0) + 1;
      return acc;
    }, {});

    // Subscription Analytics
    const subscriptionStatusDistribution = subscriptionsArray.reduce((acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1;
      return acc;
    }, {});

    const planDistribution = subscriptionsArray.reduce((acc, sub) => {
      acc[sub.plan_name] = (acc[sub.plan_name] || 0) + 1;
      return acc;
    }, {});

    // Financial Analytics
    const totalMonthlyRevenue = subscriptionsArray.reduce((acc, sub) => {
      return acc + parseFloat(sub.price || 0);
    }, 0);

    const revenueByPlan = subscriptionsArray.reduce((acc, sub) => {
      const price = parseFloat(sub.price || 0);
      acc[sub.plan_name] = (acc[sub.plan_name] || 0) + price;
      return acc;
    }, {});

    // User Activity
    const activeUsers = usersArray.filter(user => user.status === 'active').length;
    const onlineUsers = usersArray.filter(user => user.online_status && user.online_status == 'online').length;
    const boostedUsers = usersArray.filter(user => user.boosted_until && new Date(user.boosted_until) > new Date()).length;

    // Age Distribution
    const ageGroups = usersArray.reduce((acc, user) => {
      if (user.birth_year) {
        const age = new Date().getFullYear() - parseInt(user.birth_year);
        let group = '';
        if (age < 25) group = '18-24';
        else if (age < 30) group = '25-29';
        else if (age < 35) group = '30-34';
        else group = '35+';
        acc[group] = (acc[group] || 0) + 1;
      }
      return acc;
    }, {});

    // User Interaction Analytics
    const interactionAnalytics = conversationsArray.reduce((acc, conv) => {
      try {
        const messages = typeof conv.messages === 'string' ? JSON.parse(conv.messages) : (conv.messages || []);
        acc.totalConversations++;
        acc.totalMessages += messages.length;
        
        // Analyze conversation 16-17 specifically
        if (conv.conversation_id === "16-17") {
          acc.specificConversation = {
            user1_id: conv.user1_id,
            user2_id: conv.user2_id,
            messageCount: messages.length,
            messages: messages.map(msg => ({
              sender: msg.sender_id,
              content: msg.content,
              time: msg.sent_at
            }))
          };
        }

        messages.forEach(msg => {
          const hour = new Date(msg.sent_at).getHours();
          acc.messagesByHour[hour] = (acc.messagesByHour[hour] || 0) + 1;
        });
      } catch (error) {
        console.error('Error parsing conversation messages:', error);
      }
      return acc;
    }, { 
      totalConversations: 0, 
      totalMessages: 0, 
      messagesByHour: {},
      specificConversation: null
    });

    // Notification Analytics
    const notificationAnalytics = notificationsArray.reduce((acc, notif) => {
      acc.totalNotifications++;
      acc.byType[notif.type] = (acc.byType[notif.type] || 0) + 1;
      acc.byStatus[notif.status] = (acc.byStatus[notif.status] || 0) + 1;
      
      if (notif.is_read) {
        acc.read++;
      } else {
        acc.unread++;
      }

      // Connection requests analysis
      if (notif.type === 'connect') {
        acc.connectionRequests++;
        if (notif.status === 'pending') acc.pendingConnections++;
        if (notif.status === 'accepted') acc.acceptedConnections++;
      }

      return acc;
    }, { 
      totalNotifications: 0, 
      byType: {}, 
      byStatus: {}, 
      read: 0, 
      unread: 0,
      connectionRequests: 0,
      pendingConnections: 0,
      acceptedConnections: 0
    });

    return {
      // User demographics
      genderDistribution,
      religionDistribution,
      countryDistribution,
      maritalStatusDistribution,
      
      // Subscription data
      subscriptionStatusDistribution,
      planDistribution,
      totalMonthlyRevenue,
      revenueByPlan,
      
      // User activity
      activeUsers,
      onlineUsers,
      boostedUsers,
      ageGroups,
      
      // Raw arrays
      usersArray,
      subscriptionsArray,
      plansArray,
      
      // Interaction analytics
      interactionAnalytics,
      notificationAnalytics
    };
  }, [users, subscriptions, plans, conversations, notifications]);

  // Summary Cards Data
  const summaryCards = [
    {
      title: "Total Users",
      value: analyticsData.usersArray.length,
      description: `${analyticsData.activeUsers} active, ${analyticsData.onlineUsers} online`,
      path: "/users",
      color: "from-blue-500 to-blue-700",
      icon: "👥"
    },
    {
      title: "Total Subscriptions",
      value: analyticsData.subscriptionsArray.length,
      description: `$${analyticsData.totalMonthlyRevenue.toFixed(2)} monthly revenue`,
      path: "/subscriptions",
      color: "from-green-500 to-green-700",
      icon: "💰"
    },
    {
      title: "Subscription Plans",
      value: analyticsData.plansArray.length,
      description: `${Object.keys(analyticsData.planDistribution).length} active plans`,
      path: "/plans",
      color: "from-purple-500 to-purple-700",
      icon: "📋"
    },
    {
      title: "Boosted Profiles",
      value: analyticsData.boostedUsers,
      description: "Currently active boosts",
      path: "/users",
      color: "from-orange-500 to-orange-700",
      icon: "🚀"
    }
  ];

  // Quick Stats
  const quickStats = [
    // { label: "Male Users", value: analyticsData.genderDistribution.male || 0 },
    // { label: "Female Users", value: analyticsData.genderDistribution.female || 0 },
    // { label: "Active Subscriptions", value: analyticsData.subscriptionStatusDistribution.active || 0 },
    // { label: "Premium Plan Users", value: analyticsData.planDistribution.Premium || 0 },
  ];

  // Interaction Stats
  const interactionStats = [
    // { label: "Total Conversations", value: analyticsData.interactionAnalytics.totalConversations },
    // { label: "Total Messages", value: analyticsData.interactionAnalytics.totalMessages },
    // { label: "Connection Requests", value: analyticsData.notificationAnalytics.connectionRequests },
    // { label: "Pending Connections", value: analyticsData.notificationAnalytics.pendingConnections },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} p-4 rounded-lg shadow-lg text-white transform hover:scale-105 transition duration-200`}
          >
            <Link to={card.path} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-3xl font-bold my-2">{card.value}</p>
                  <p className="text-sm opacity-90">{card.description}</p>
                </div>
                <span className="text-4xl">{card.icon}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Interaction Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {interactionStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Component */}
      <DashboardCharts analyticsData={analyticsData} />
    </div>
  );
};

export default Dashboard;