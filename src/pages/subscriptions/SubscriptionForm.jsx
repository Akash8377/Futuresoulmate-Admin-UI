// components/SubscriptionForm.js
import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../users/slice/usersSlice'; // Import your users fetch action
import { useDispatch, useSelector } from 'react-redux';

const SubscriptionForm = ({ subscription, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    plan_name: '',
    price: '',
    billing_cycle: 'monthly',
    start_date: '',
    end_date: '',
    status: 'active',
    features: []
  });
  const [featureInput, setFeatureInput] = useState('');
  const dispatch = useDispatch();
  
  // Get users from Redux store or fetch them
  const users = useSelector((state) => state.users.users || []);
  const usersLoading = useSelector((state) => state.users.isLoading);

  useEffect(() => {
    // Fetch users if not already loaded
    if (users.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, users.length]);

  // Rest of the component remains the same...
  // Helper function to format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (subscription) {
      console.log("subscription", subscription);
      setFormData({
        user_id: subscription.user_id,
        plan_name: subscription.plan_name,
        price: subscription.price,
        billing_cycle: subscription.billing_cycle,
        start_date: formatDateForInput(subscription.start_date),
        end_date: formatDateForInput(subscription.end_date),
        status: subscription.status,
        features: subscription.features || []
      });
    }
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Select User</label>
        {usersLoading ? (
          <p className="text-sm text-gray-500">Loading users...</p>
        ) : (
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            disabled={formData.user_id ? true : false}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {/* {user.first_name} {user.last_name} ({user.email}) - ID: {user.profileId} */}
                {user.first_name} {user.last_name} - ID: {user.profileId}
              </option>
            ))}
          </select>
        )}
        {/* {formData.user_id && (
          <p className="text-sm text-gray-500 mt-1">
            Selected User ID: {formData.profileId}
          </p>
        )} */}
      </div>

      {/* Rest of the form remains the same */}
      <div>
        <label className="block text-sm font-medium mb-1">Plan Name</label>
        <input
          type="text"
          name="plan_name"
          value={formData.plan_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Billing Cycle</label>
        <select
          name="billing_cycle"
          value={formData.billing_cycle}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
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
          <option value="canceled">Canceled</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Features</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Add a feature"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Add
          </button>
        </div>
        
        {formData.features.length > 0 && (
          <ul className="mt-2 border rounded divide-y">
            {formData.features.map((feature, index) => (
              <li key={index} className="p-2 flex justify-between items-center">
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
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
          {loading ? 'Processing...' : (subscription ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;