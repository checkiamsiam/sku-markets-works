import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import useClickOutside from 'hooks/useSearchBarToggle';
import { useRef, useState } from 'react';
import AcceptanceRTV from './AcceptanceRTV';
import AwaitingAccordion from './Awaiting';
import RTVDelivered from './RTVDelivered';
import RTVShipped from './RTVShipped';

const RetrurningAccordions = () => {
  const ref = useRef();
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [expand3, setExpand3] = useState(false);
  const [expand4, setExpand4] = useState(false);
  useClickOutside(ref, () => {
    setExpand1(false);
    setExpand2(false);
    setExpand3(false);
    setExpand4(false);
  });
  return (
    <>
      <div ref={ref}>
        <Accordion
          expanded={expand1}
          onChange={(e, expand) => {
            setExpand4(false);
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
            <Typography sx={{ width: '33%', flexShrink: 0 ,  color: "#3366FF" }}>RTV Acceptance</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Accept returns make you trusted partner</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AcceptanceRTV />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand2}
          onChange={(e, expand) => {
            setExpand4(false);
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
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>Awaiting RTV</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ship it quickly to disburse your payment quickly</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AwaitingAccordion />
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
          expanded={expand3}
          onChange={(e, expand) => {
            setExpand1(false);
            setExpand2(false);
            setExpand3(expand);
            setExpand4(false);
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
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>RTV Shipped</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ship it quickly to retrieve your payment quickly</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RTVShipped />
          </AccordionDetails>
        </Accordion> */}
        <Accordion
          expanded={expand4}
          onChange={(e, expand) => {
            setExpand1(false);
            setExpand2(false);
            setExpand3(false);
            setExpand4(expand);
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
            <Typography sx={{ width: '33%', flexShrink: 0 , color: "#3366FF"}}>RTV Delivered</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Let us know you have received your returns quickly</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RTVDelivered />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default RetrurningAccordions;
