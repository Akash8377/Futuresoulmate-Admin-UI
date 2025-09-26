// components/PlanList.js
import React from "react";
import StatusToggle from "../../components/common/StatusToggle/StatusToggle";

const PlanList = ({ plans, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return <div className="text-center py-8">Loading plans...</div>;
  }

  if (plans.length === 0) {
    return <div className="text-center py-8">No plans found.</div>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2 border border-gray-300">Title</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="hover:bg-gray-200">
              <td className="p-2 border border-gray-300 text-center font-medium">
                {plan.name}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {formatPrice(plan.price)}
              </td>
              <td className="p-2 border border-gray-300">
                <div
                  className="inner-html text-sm text-gray-800"
                  dangerouslySetInnerHTML={{ __html: plan.description }}
                />
              </td>
              <td className="p-2 border border-gray-300 text-center">
                <StatusToggle
                  status={plan.status}
                  onToggle={(newStatus) => onStatusChange(plan.id, newStatus)}
                />
              </td>
              <td className="p-2 border border-gray-300 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(plan.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(plan)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanList;




// // components/PlanList.js
// import React from 'react';
// import StatusToggle from '../../components/common/StatusToggle/StatusToggle';

// const PlanList = ({ plans, loading, onEdit, onDelete, onStatusChange }) => {
//   if (loading) {
//     return <div className="text-center py-8">Loading plans...</div>;
//   }

//   if (plans.length === 0) {
//     return <div className="text-center py-8">No plans found.</div>;
//   }

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price);
//   };

//   const stripHtml = (html) => {
//     const tmp = document.createElement('DIV');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   };

//   const truncateDescription = (description, maxLength = 100) => {
//     const plainText = stripHtml(description);
//     return plainText.length > maxLength 
//       ? plainText.substring(0, maxLength) + '...' 
//       : plainText;
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-50">
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 ">Title</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 ">Price</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 ">Description</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 ">Status</th>
//             <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 ">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {plans.map((plan) => (
//             <tr key={plan.id}>
//               <td className="px-6 py-4">
//                 <div className="text-sm font-medium text-gray-900">{plan.name}</div>
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-900">
//                 {formatPrice(plan.price)}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-900">
//                 <div className='inner-html'
//                     dangerouslySetInnerHTML={{ __html: plan.description }}
//                 />
//               </td>
//               <td className="px-6 py-4">
//                 <StatusToggle
//                   status={plan.status}
//                   onToggle={(newStatus) => onStatusChange(plan.id, newStatus)}
//                 />
//               </td>
//               <td className="px-6 py-4">
//               <div className="flex items-center justify-center text-sm font-medium space-x-2 w-full h-full">
//                 <button
//                   onClick={() => onEdit(plan.id)}
//                   className="text-indigo-600 hover:text-indigo-900"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(plan)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   Delete
//                 </button>
//               </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PlanList;