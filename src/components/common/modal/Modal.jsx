// src/components/Modal.jsx
import React from "react";
import { FaTimes, FaPrint } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children,print=false, size=null }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById("modal-print-content");
    const titleElement = document.querySelector(".modal-title"); // Add this class to your title
    const originalContent = document.body.innerHTML;

    // Create a print document with title and content
    const printDocument = `
    <div style="">
      ${
        titleElement
          ? `<h2 style="padding-left:15px; font-weight:700;">${titleElement.textContent}</h2>`
          : ""
      }
      ${printContent.innerHTML}
    </div>
  `;

    document.body.innerHTML = printDocument;
    window.print();
    document.body.innerHTML = originalContent;

    // Re-initialize any necessary scripts or event listeners
    window.location.reload();
  };

  return (
    <div className={`fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50 `}>
      <div className={`bg-white text-black max-w-4xl mx-4 p-6 rounded-lg shadow-lg ${size==="sm"?"w-1/3":"w-full"}`}>
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="modal-title text-2xl font-bold">
              {title}
            </h2>
          )}
          <div className="flex gap-5">
            {print ? (<button
              onClick={handlePrint}
              className="text-gray-500 hover:text-gray-700"
              title="Print"
            >
              <FaPrint size={20} />
            </button>):null}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
        <div id="modal-print-content" className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;