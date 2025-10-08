// components/ServiceList.js
import React from "react";
import StatusToggle from "../../components/common/StatusToggle/StatusToggle";

const ServiceList = ({ services, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (services.length === 0) {
    return <div className="text-center py-8">No services found.</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-gray-200">
              <td className="p-2 border border-gray-300 text-center font-medium">
                {service.name}
              </td>
              <td className="p-2 border border-gray-300">
                <div className="text-sm text-gray-800">
                  {service.description || 'No description'}
                </div>
              </td>
              <td className="p-2 border border-gray-300 text-center">
                <StatusToggle
                  status={service.status}
                  onToggle={(newStatus) => onStatusChange(service.id, newStatus)}
                />
              </td>
              <td className="p-2 border border-gray-300 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(service.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(service)}
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

export default ServiceList;