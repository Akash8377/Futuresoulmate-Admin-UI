// src/components/Typography/ErrorText.js
import React from 'react';

function ErrorText({ children }) {
  return <p className="text-red-500 mt-2">{children.msg}</p>;
}

export default ErrorText;
