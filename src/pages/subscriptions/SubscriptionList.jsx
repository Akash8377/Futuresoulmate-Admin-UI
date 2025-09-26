// components/SubscriptionList.js
import React from "react";

const SubscriptionList = ({ subscriptions, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading subscriptions...</div>;
  }

  if (subscriptions.length === 0) {
    return <div className="text-center py-8">No subscriptions found.</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "canceled": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2 border border-gray-300">User</th>
            <th className="p-2 border border-gray-300">Plan</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Billing Cycle</th>
            <th className="p-2 border border-gray-300">Period</th>
            <th className="p-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="hover:bg-gray-200">
              <td className="p-2 border border-gray-300">
                <div className="font-medium">
                  {subscription.first_name} {subscription.last_name}
                </div>
                <div className="text-sm text-gray-600">{subscription.email}</div>
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {subscription.plan_name}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                ${subscription.price}
              </td>
              <td className="p-2 border border-gray-300 text-center capitalize">
                {subscription.billing_cycle}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {formatDate(subscription.start_date)} -{" "}
                {formatDate(subscription.end_date)}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    subscription.status
                  )}`}
                >
                  {subscription.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionList;




// // components/SubscriptionList.js
// import React from 'react';

// const SubscriptionList = ({ subscriptions, loading, onEdit, onDelete }) => {
//   if (loading) {
//     return <div className="text-center py-8">Loading subscriptions...</div>;
//   }

//   if (subscriptions.length === 0) {
//     return <div className="text-center py-8">No subscriptions found.</div>;
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'inactive': return 'bg-gray-100 text-gray-800';
//       case 'canceled': return 'bg-yellow-100 text-yellow-800';
//       case 'expired': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-50">
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">User</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Plan</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Price</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Billing Cycle</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Period</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Status</th>
//             {/* <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Actions</th> */}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {subscriptions.map((subscription) => (
//             <tr key={subscription.id}>
//               <td className="px-6 py-4">
//                 <div className="text-sm font-medium text-gray-900">
//                   {subscription.first_name} {subscription.last_name}
//                 </div>
//                 <div className="text-sm text-gray-500">{subscription.email}</div>
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-900">{subscription.plan_name}</td>
//               <td className="px-6 py-4 text-sm text-gray-900">${subscription.price}</td>
//               <td className="px-6 py-4 text-sm text-gray-900 capitalize">{subscription.billing_cycle}</td>
//               <td className="px-6 py-4 text-sm text-gray-900">
//                 {formatDate(subscription.start_date)} - {formatDate(subscription.end_date)}
//               </td>
//               <td className="px-6 py-4">
//                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
//                   {subscription.status}
//                 </span>
//               </td>
//               {/* <td className="px-6 py-4 text-sm font-medium space-x-2">
//                 <button
//                   onClick={() => onEdit(subscription.id)}
//                   className="text-indigo-600 hover:text-indigo-900"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(subscription)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   Delete
//                 </button>
//               </td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SubscriptionList;