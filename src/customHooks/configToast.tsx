import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef } from 'react';

const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'error' | 'success' | 'info'>('error');

  const toastId = useRef<string | number>(""); // Explicitly specify the type as string or null

  const dismissToast = () => {
    if (toastId.current) {
      toast.dismiss(toastId.current);
    }
  };

  useEffect(() => {
    if (message) {
      switch (type) {
        case 'error':

          toastId.current = toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case 'success':
          toastId.current = toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case 'info':
          toastId.current = toast.info(message, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        default:
          break;
      }
    }
  }, [message, type]);

  const showToast = (message: string, toastType: 'error' | 'success' | 'info' = 'error') => {
    setMessage(message);
    setType(toastType);
  };



  return { showToast, dismissToast };
};

export default useToast;
