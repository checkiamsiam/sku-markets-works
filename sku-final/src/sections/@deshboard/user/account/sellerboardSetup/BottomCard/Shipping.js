import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import ShippingShipped from './ShippingShipped';

const Shipping = () => {
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
  });
  return (
    <>
      <div ref={ref}>
        <Accordion
          expanded={expand1}
          onChange={(e, expand) => {
            setExpand2(false);
            setExpand1(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1F262E' : '#F6F7F8'),
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0, color: '#3366FF' }}>
              Shipments Shipped
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Ship it quickly to disburse your payment quickly
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShippingShipped />
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
          expanded={expand2}
          onChange={(e, expand) => {
            setExpand1(false);
            setExpand2(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: '#F6F7F8',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>Shipments Delivered</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Confirm your delivery to post your review </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShippingDelivered />
          </AccordionDetails>
        </Accordion> */}
      </div>
    </>
  );
};

export default Shipping;
