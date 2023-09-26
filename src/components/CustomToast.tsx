import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function CustomToast() {
    return (
        <ToastContainer

            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}

        />
    )
}
