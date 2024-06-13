'use client';

import { Toaster } from "react-hot-toast";
import './ToastStyles.css';

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'dark-toast',
      }}
    />
  );
};

export default ToasterContext;
