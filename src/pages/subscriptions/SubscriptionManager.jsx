// components/SubscriptionManager.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubscriptions,
  fetchSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  clearError,
  clearSuccess,
  setCurrentSubscription
} from './slice/subscriptionSlice';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionList from './SubscriptionList';
import Modal from '../../components/common/modal/Modal';
import { setHeadingTitle } from "../../reducers/HeadingSlice/headingSlice";

const SubscriptionManager = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading, error, success, currentSubscription } = useSelector(
    (state) => state.subscriptions
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  // 🔍 New search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);

  useEffect(() => {
    dispatch(fetchSubscriptions());
    dispatch(setHeadingTitle("All Subscriptions"));
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

  // 🔄 Auto filter when searchTerm, statusFilter, or subscriptions change
  useEffect(() => {
    let filtered = subscriptions || [];

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (sub) =>
          sub.first_name.toLowerCase().includes(lower) ||
          sub.last_name.toLowerCase().includes(lower) ||
          sub.email.toLowerCase().includes(lower) ||
          sub.plan_name.toLowerCase().includes(lower)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (sub) => sub.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredSubscriptions(filtered);
  }, [searchTerm, statusFilter, subscriptions]);

  const handleCreate = () => {
    dispatch(setCurrentSubscription(null));
    setIsFormOpen(true);
  };

  const handleEdit = (id) => {
    dispatch(fetchSubscriptionById(id));
    setIsFormOpen(true);
  };

  const handleDelete = (subscription) => {
    setSubscriptionToDelete(subscription);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteSubscription(subscriptionToDelete.id));
    setIsDeleteConfirmOpen(false);
    setSubscriptionToDelete(null);
  };

  const handleSubmit = (subscriptionData) => {
    if (currentSubscription) {
      dispatch(updateSubscription({ id: currentSubscription.id, subscriptionData }));
    } else {
      dispatch(createSubscription(subscriptionData));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    dispatch(setCurrentSubscription(null));
  };

  return (
    <div className="container mx-auto p-4">
      {/* 🔍 Search + Status Filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Plan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded bg-white text-black"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded bg-white text-black"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="canceled">Canceled</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <SubscriptionList
        subscriptions={filteredSubscriptions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={currentSubscription ? 'Edit Subscription' : 'Create Subscription'}
      >
        <SubscriptionForm
          subscription={currentSubscription}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
          loading={loading}
        />
      </Modal>

      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Confirm Delete"
      >
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to delete the subscription "
            {subscriptionToDelete?.plan_name}" for {subscriptionToDelete?.first_name}{" "}
            {subscriptionToDelete?.last_name}?
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

export default SubscriptionManager;




// // components/SubscriptionManager.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchSubscriptions,
//   fetchSubscriptionById,
//   createSubscription,
//   updateSubscription,
//   deleteSubscription,
//   clearError,
//   clearSuccess,
//   setCurrentSubscription
// } from './slice/subscriptionSlice';
// import SubscriptionForm from './SubscriptionForm';
// import SubscriptionList from './SubscriptionList';
// import Modal from '../../components/common/modal/Modal';
// import { setHeadingTitle } from "../../reducers/HeadingSlice/headingSlice";

// const SubscriptionManager = () => {
//   const dispatch = useDispatch();
//   const { subscriptions, loading, error, success, currentSubscription } = useSelector(
//     (state) => state.subscriptions
//   );
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
//   const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSubscriptions());
//     dispatch(setHeadingTitle("All Subscriptions"));
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       setIsFormOpen(false);
//       const timer = setTimeout(() => {
//         dispatch(clearSuccess());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, dispatch]);

//   const handleCreate = () => {
//     dispatch(setCurrentSubscription(null));
//     setIsFormOpen(true);
//   };

//   const handleEdit = (id) => {
//     dispatch(fetchSubscriptionById(id));
//     setIsFormOpen(true);
//   };

//   const handleDelete = (subscription) => {
//     setSubscriptionToDelete(subscription);
//     setIsDeleteConfirmOpen(true);
//   };

//   const confirmDelete = () => {
//     dispatch(deleteSubscription(subscriptionToDelete.id));
//     setIsDeleteConfirmOpen(false);
//     setSubscriptionToDelete(null);
//   };

//   const handleSubmit = (subscriptionData) => {
//     if (currentSubscription) {
//       dispatch(updateSubscription({ id: currentSubscription.id, subscriptionData }));
//     } else {
//       dispatch(createSubscription(subscriptionData));
//     }
//   };

//   const handleCloseForm = () => {
//     setIsFormOpen(false);
//     dispatch(setCurrentSubscription(null));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={handleCreate}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Create Subscription
//         </button>
//       </div> */}

//       {/* {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//           <button
//             onClick={() => dispatch(clearError())}
//             className="float-right text-red-800 font-bold"
//           >
//             ×
//           </button>
//         </div>
//       )} */}

//       {/* {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           Subscription Updated successfully!
//         </div>
//       )} */}

//       <SubscriptionList
//         subscriptions={subscriptions}
//         loading={loading}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Modal isOpen={isFormOpen} onClose={handleCloseForm} title={currentSubscription ? 'Edit Subscription' : 'Create Subscription'}>
//         <SubscriptionForm
//           subscription={currentSubscription}
//           onSubmit={handleSubmit}
//           onCancel={handleCloseForm}
//           loading={loading}
//         />
//       </Modal>

//       <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} title="Confirm Delete">
//         <div className="p-4">
//           <p className="mb-4">
//             Are you sure you want to delete the subscription "
//             {subscriptionToDelete?.plan_name}" for {subscriptionToDelete?.first_name} {subscriptionToDelete?.last_name}?
//           </p>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setIsDeleteConfirmOpen(false)}
//               className="px-4 py-2 border border-gray-300 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmDelete}
//               className="px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default SubscriptionManager;