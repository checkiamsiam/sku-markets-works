import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import ShipingPreparePack from './ShipingPreparePack';
import ShippingPick from './ShippingPreparePick';
import ShippingPrepareRTD from './ShippingPrepareRTD';

const ShipmentPreparing = () => {
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [expand3, setExpand3] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
    setExpand3(false);
  });
  return (
    <>
      <div ref={ref}>
        <Accordion
          expanded={expand1}
          onChange={(e, expand) => {
            setExpand3(false);
            setExpand2(false);
            setExpand1(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1F262E" : '#F6F7F8',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>Pick</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Pick it in the same time you receive an order</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShipingPreparePack />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand2}
          onChange={(e, expand) => {
            setExpand3(false);
            setExpand1(false);
            setExpand2(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1F262E" : '#F6F7F8',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>Pack</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Pack it now to keep it ready</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShippingPick />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand3}
          onChange={(e, expand) => {
            setExpand1(false);
            setExpand2(false);
            setExpand3(expand);
          }}
          sx={{
            p: 2,
            boxShadow: 5,
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1F262E" : '#F6F7F8',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>Ready To Deliver</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Deliver it fast</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShippingPrepareRTD />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default ShipmentPreparing;
