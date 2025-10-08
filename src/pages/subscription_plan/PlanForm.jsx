// components/PlanForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import config from '../../config';
import { fetchServices } from '../plan_service/slice/serviceSlice'; // Adjust path as needed

const PlanForm = ({ plan, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    services: [], // This will now store objects with service id and count
    status: 'active'
  });
  
  const dispatch = useDispatch();
  
  // Correct way to access services from Redux state
  const { services, loading: servicesLoading } = useSelector(state => state.services);
  
  useEffect(() => {
    // Dispatch the fetchServices action
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (plan) {
      console.log('Plan data in form:', plan); // Debug log
      setFormData({
        name: plan.name || '',
        price: plan.price || '',
        description: plan.description || '',
        services: plan.services ? plan.services.map(s => ({
          id: s.id,
          count: s.service_count || 0 // Use service_count from API
        })) : [],
        status: plan.status || 'active'
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleServicesChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => ({
      id: option.value,
      count: 0 // Initialize count to 0 for new selections
    })) : [];
    
    // Preserve counts for services that were already selected
    const updatedServices = selectedValues.map(newService => {
      const existingService = formData.services.find(s => s.id === newService.id);
      return existingService ? existingService : newService;
    });
    
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const handleServiceCountChange = (serviceId, count) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === serviceId ? { ...service, count: parseInt(count) || 0 } : service
      )
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Debug log
    onSubmit(formData);
  };

  // Transform services for react-select - add safety check
  const serviceOptions = Array.isArray(services) 
    ? services.map(service => ({
        value: service.id,
        label: service.name,
        description: service.description
      }))
    : [];

  // Get selected services for display with their data
  const selectedServices = formData.services.map(serviceData => {
    const service = services.find(s => s.id === serviceData.id);
    return {
      ...serviceData,
      name: service?.name || 'Unknown Service',
      description: service?.description || ''
    };
  });

  // Get current selected values for react-select
  const currentSelectedValues = serviceOptions.filter(option => 
    formData.services.some(service => service.id === option.value)
  );

  // Custom styles for react-select to fix z-index issue
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Higher than TinyMCE's z-index
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    container: (provided) => ({
      ...provided,
      zIndex: 9999,
    })
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder="Enter plan name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price ($)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder="0.00"
        />
      </div>

      {/* Services Select */}
      <div>
        <label className="block text-sm font-medium mb-1">Services</label>
        <Select
          isMulti
          options={serviceOptions}
          value={currentSelectedValues}
          onChange={handleServicesChange}
          isLoading={servicesLoading}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder={servicesLoading ? "Loading services..." : "Select services..."}
          styles={customStyles}
          menuPortalTarget={document.body} // This renders the dropdown in body
          menuPosition="fixed"
        />
        
        {/* Display selected services with count inputs */}
        {selectedServices.length > 0 && (
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium mb-2">Selected Services:</p>
            <div className="space-y-4">
              {selectedServices.map(service => (
                <div key={service.id} className="flex justify-between items-start p-2 border rounded bg-white">
                  <div className="flex-1">
                    <span className="font-medium text-sm">{service.name}</span>
                    {service.description && (
                      <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    <label className="block text-xs font-medium mb-1 text-gray-700">
                      Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={service.count}
                      onChange={(e) => handleServiceCountChange(service.id, e.target.value)}
                      className="w-20 p-1 border rounded text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Editor
          apiKey={config.TINY_MCE_KEY}
          value={formData.description}
          onEditorChange={handleDescriptionChange}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
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
          {loading ? 'Processing...' : (plan ? 'Update Plan' : 'Create Plan')}
        </button>
      </div>
    </form>
  );
};

export default PlanForm;