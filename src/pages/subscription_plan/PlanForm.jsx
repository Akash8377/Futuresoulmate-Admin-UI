// components/PlanForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import config from '../../config';

const PlanForm = ({ plan, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    total_boosts: 0, // Add this field
    status: 'active'
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        price: plan.price || '',
        description: plan.description || '',
        total_boosts: plan.total_boosts || 0, // Add this field
        status: plan.status || 'active'
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'total_boosts' ? parseInt(value) || 0 : value 
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

      {/* Add Total Boosts field */}
      <div>
        <label className="block text-sm font-medium mb-1">Total Boosts</label>
        <input
          type="number"
          min="0"
          name="total_boosts"
          value={formData.total_boosts}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          placeholder="Enter number of boosts"
        />
        <p className="text-xs text-gray-500 mt-1">
          Number of profile boosts users get with this plan
        </p>
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



// // components/PlanForm.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Editor } from '@tinymce/tinymce-react';
// import config from '../../config';
// const PlanForm = ({ plan, onSubmit, onCancel, loading }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     description: '',
//     status: 'active'
//   });
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (plan) {
//       setFormData({
//         name: plan.name || '',
//         price: plan.price || '',
//         description: plan.description || '',
//         status: plan.status || 'active'
//       });
//     }
//   }, [plan]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDescriptionChange = (content) => {
//     setFormData(prev => ({ ...prev, description: content }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium mb-1">Title</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//           placeholder="Enter plan name"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Price ($)</label>
//         <input
//           type="number"
//           step="0.01"
//           min="0"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//           placeholder="0.00"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Description</label>
//         <Editor
//           apiKey={config.TINY_MCE_KEY} // Replace with your TinyMCE API key
//           value={formData.description}
//           onEditorChange={handleDescriptionChange}
//           init={{
//             height: 300,
//             menubar: false,
//             plugins: [
//               'advlist autolink lists link image charmap print preview anchor',
//               'searchreplace visualblocks code fullscreen',
//               'insertdatetime media table paste code help wordcount'
//             ],
//             toolbar:
//               'undo redo | formatselect | bold italic backcolor | \
//               alignleft aligncenter alignright alignjustify | \
//               bullist numlist outdent indent | removeformat | help'
//           }}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Status</label>
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         >
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>
//       </div>

//       <div className="flex justify-end space-x-2 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 border border-gray-300 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
//         >
//           {loading ? 'Processing...' : (plan ? 'Update Plan' : 'Create Plan')}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default PlanForm;