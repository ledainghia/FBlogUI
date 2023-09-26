import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

const useErrorToast = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [error]);

    const showErrorToast = (message: string) => {
        setError(message);
    };

    return showErrorToast;
};

export default useErrorToast;
