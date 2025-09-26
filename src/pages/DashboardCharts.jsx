import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

const DashboardCharts = ({ analyticsData }) => {
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Prepare chart data
  const getChartData = () => {
    const {
      genderDistribution,
      religionDistribution,
      countryDistribution,
      maritalStatusDistribution,
      subscriptionStatusDistribution,
      planDistribution,
      revenueByPlan,
      ageGroups,
      usersArray,
      subscriptionsArray,
      plansArray,
      interactionAnalytics,
      notificationAnalytics
    } = analyticsData;

    // Connection Analytics Chart Data
    const connectionData = {
      labels: ['Connection Requests', 'Accepted Connections', 'Pending Connections'],
      datasets: [
        {
          label: 'Connection Statistics',
          data: [
            notificationAnalytics.connectionRequests,
            notificationAnalytics.acceptedConnections,
            notificationAnalytics.pendingConnections
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)', // Blue for requests
            'rgba(34, 197, 94, 0.8)',  // Green for accepted
            'rgba(245, 158, 11, 0.8)'  // Yellow for pending
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(245, 158, 11, 1)'
          ],
          borderWidth: 2,
        },
      ],
    };

    // Connection Status Pie Chart
    const connectionStatusData = {
      labels: ['Accepted', 'Pending'],
      datasets: [
        {
          label: 'Connection Status',
          data: [
            notificationAnalytics.acceptedConnections,
            notificationAnalytics.pendingConnections
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)', // Green for accepted
            'rgba(245, 158, 11, 0.8)' // Yellow for pending
          ],
          borderWidth: 2,
        },
      ],
    };

    // Gender Distribution Pie Chart
    const genderData = {
      labels: Object.keys(genderDistribution),
      datasets: [
        {
          label: 'Users by Gender',
          data: Object.values(genderDistribution),
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)'
          ],
          borderWidth: 2,
        },
      ],
    };

    // Religion Distribution Chart
    const religionData = {
      labels: Object.keys(religionDistribution),
      datasets: [
        {
          label: 'Users by Religion',
          data: Object.values(religionDistribution),
          backgroundColor: [
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)'
          ],
        },
      ],
    };

    // Subscription Plan Distribution
    const subscriptionPlanData = {
      labels: Object.keys(planDistribution),
      datasets: [
        {
          label: 'Subscriptions by Plan',
          data: Object.values(planDistribution),
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
        },
      ],
    };

    // Revenue by Plan Bar Chart
    const revenueData = {
      labels: Object.keys(revenueByPlan),
      datasets: [
        {
          label: 'Monthly Revenue ($)',
          data: Object.values(revenueByPlan),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Age Distribution Bar Chart
    const ageData = {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: 'Users by Age Group',
          data: Object.values(ageGroups),
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 1,
        },
      ],
    };

    // User Registration Trend (Monthly)
    const registrationTrend = usersArray.reduce((acc, user) => {
      if (user.created_at) {
        const month = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    }, {});

    const trendData = {
      labels: Object.keys(registrationTrend),
      datasets: [
        {
          label: 'New Registrations',
          data: Object.values(registrationTrend),
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };

    // Message Activity by Hour
    const messageActivityData = {
      labels: Array.from({length: 24}, (_, i) => `${i}:00`),
      datasets: [
        {
          label: 'Messages by Hour',
          data: Array.from({length: 24}, (_, i) => interactionAnalytics.messagesByHour[i] || 0),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };

    return {
      connectionData,
      connectionStatusData,
      genderData,
      religionData,
      subscriptionPlanData,
      revenueData,
      ageData,
      trendData,
      messageActivityData
    };
  };

  const {
    connectionData,
    connectionStatusData,
    genderData,
    religionData,
    subscriptionPlanData,
    revenueData,
    ageData,
    trendData,
    messageActivityData
  } = getChartData();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
      
      {/* Connection Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Connection Analytics</h3>
          <div className="h-64">
            <Bar data={connectionData} options={barOptions} />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Total Connection Requests: {analyticsData.notificationAnalytics.connectionRequests}</p>
            <p>Accepted: {analyticsData.notificationAnalytics.acceptedConnections}</p>
            <p>Pending: {analyticsData.notificationAnalytics.pendingConnections}</p>
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Message Activity by Hour</h3>
          <div className="h-64">
            <Bar data={messageActivityData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* First Row - User Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
          <div className="h-64">
            <Pie data={genderData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Age Group Distribution</h3>
          <div className="h-64">
            <Bar data={ageData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Second Row - Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Religion Distribution</h3>
          <div className="h-64">
            <Pie data={religionData} options={chartOptions} />
          </div>
        </div>
        {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Message Activity by Hour</h3>
          <div className="h-64">
            <Bar data={messageActivityData} options={barOptions} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardCharts;