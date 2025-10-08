// components/ServiceForm.js
import React, { useState, useEffect } from 'react';
import config from '../../config';

const ServiceForm = ({ service, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        status: service.status || 'active'
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Service Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder="Enter service name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          className="w-full p-2 border rounded"
          placeholder="Enter service description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : (service ? 'Update Service' : 'Create Service')}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;