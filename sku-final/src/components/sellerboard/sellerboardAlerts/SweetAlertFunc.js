// import React from 'react';
import Swal from 'sweetalert2';

const SweetAlertFunc = (handleClose) => {
    const alert = ()=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          handleClose();
    }
    return (
        alert
    );
};

export default SweetAlertFunc;