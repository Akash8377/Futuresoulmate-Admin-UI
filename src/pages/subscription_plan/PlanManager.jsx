// components/PlanManager.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlans,
  fetchPlanById,
  createPlan,
  updatePlan,
  updatePlanStatus,
  deletePlan,
  clearError,
  clearSuccess,
  setCurrentPlan
} from './slice/planSlice';
import PlanForm from './PlanForm';
import PlanList from './PlanList';
import Modal from '../../components/common/modal/Modal';
import { setHeadingTitle } from "../../reducers/HeadingSlice/headingSlice";

const PlanManager = () => {
  const dispatch = useDispatch();
  const { plans, loading, error, success, currentPlan } = useSelector(
    (state) => state.plans
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(setHeadingTitle("Subscription Plans"));
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
    dispatch(setCurrentPlan(null));
    setIsFormOpen(true);
  };

  const handleEdit = (id) => {
    dispatch(fetchPlanById(id));
    setIsFormOpen(true);
  };

  const handleDelete = (plan) => {
    setPlanToDelete(plan);
    setIsDeleteConfirmOpen(true);
  };

  const handleStatusChange = (id, status) => {
    dispatch(updatePlanStatus({ id, status }));
  };

  const confirmDelete = () => {
    dispatch(deletePlan(planToDelete.id));
    setIsDeleteConfirmOpen(false);
    setPlanToDelete(null);
  };

  const handleSubmit = (planData) => {
    if (currentPlan) {
      dispatch(updatePlan({ id: currentPlan.id, planData }));
    } else {
      dispatch(createPlan(planData));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    dispatch(setCurrentPlan(null));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Plan
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

      {/* {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Operation completed successfully!
        </div>
      )} */}

      <PlanList
        plans={plans}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <Modal isOpen={isFormOpen} onClose={handleCloseForm} title={currentPlan ? 'Edit Plan' : 'Create Plan'}>
        <PlanForm
          plan={currentPlan}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
          loading={loading}
        />
      </Modal>

      <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} title="Confirm Delete">
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to delete the plan "{planToDelete?.name}"?
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

export default PlanManager;