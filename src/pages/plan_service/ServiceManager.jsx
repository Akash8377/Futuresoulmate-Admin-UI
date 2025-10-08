// components/ServiceManager.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServices,
  fetchServiceById,
  createService,
  updateService,
  updateServiceStatus,
  deleteService,
  clearError,
  clearSuccess,
  setCurrentService
} from './slice/serviceSlice';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import Modal from '../../components/common/modal/Modal';
import { setHeadingTitle } from "../../reducers/HeadingSlice/headingSlice";

const ServiceManager = () => {
  const dispatch = useDispatch();
  const { services, loading, error, success, currentService } = useSelector(
    (state) => state.services
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(setHeadingTitle("Subscription Services"));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setIsFormOpen(false);
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleCreate = () => {
    dispatch(setCurrentService(null));
    setIsFormOpen(true);
  };

  const handleEdit = (id) => {
    dispatch(fetchServiceById(id));
    setIsFormOpen(true);
  };

  const handleDelete = (service) => {
    setServiceToDelete(service);
    setIsDeleteConfirmOpen(true);
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateServiceStatus({ id, status }));
  };

  const confirmDelete = () => {
    dispatch(deleteService(serviceToDelete.id));
    setIsDeleteConfirmOpen(false);
    setServiceToDelete(null);
  };

  const handleSubmit = (serviceData) => {
    if (currentService) {
      dispatch(updateService({ id: currentService.id, serviceData }));
    } else {
      dispatch(createService(serviceData));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    dispatch(setCurrentService(null));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Service
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={() => dispatch(clearError())}
            className="float-right text-red-800 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <ServiceList
        services={services}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <Modal isOpen={isFormOpen} onClose={handleCloseForm} title={currentService ? 'Edit Service' : 'Create Service'}>
        <ServiceForm
          service={currentService}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
          loading={loading}
        />
      </Modal>

      <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} title="Confirm Delete" size="sm">
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to delete the service "{serviceToDelete?.name}"?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceManager;