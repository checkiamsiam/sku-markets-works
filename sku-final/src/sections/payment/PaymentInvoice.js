import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

import { Box, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function PaymentInvoice() {

  return (
    <>
    <Box sx={{my: 10, textAlign: 'center'}}>
      <Typography variant='h4'>PDF Generated with React PDF renderer</Typography>
        <PDFDownloadLink document={<InvoicePDF/>} fileName='Invoice'>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading Document' : <Button variant='contained'>
            Download PDF
          </Button>}
        </PDFDownloadLink>
    </Box>
    <PDFViewer width='90%' height='90%'>
      <InvoicePDF/>
    </PDFViewer>
    </>
  );
}
