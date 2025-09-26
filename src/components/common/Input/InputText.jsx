import React from 'react';

function InputText({ type, value, updateType, labelTitle, updateFormValue, containerStyle }) {
  const handleChange = (e) => {
    updateFormValue({ updateType, value: e.target.value });
  };

  return (
    <div className={`mb-4 ${containerStyle}`}>
      <label className={`flex justify-start text-md font-medium mb-1 text-black`}>
        {labelTitle}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className={`input w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-black`}
      />
    </div>
  );
}

export default InputText;