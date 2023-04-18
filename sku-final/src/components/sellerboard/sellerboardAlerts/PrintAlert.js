// import React from 'react';
import { useTheme } from '@mui/styles';
import Swal from 'sweetalert2';

const PrintAlert = () => {
    const theme = useTheme();
  const printAlrt = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Downloaded Successfully',
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      width:'20em',
      background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
      color: theme.palette.mode === 'dark' ?'#fff'  : '#212B36',
    });
  };
  return printAlrt;
};

export default PrintAlert;
