import React, { useState, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import useClickOutside from 'hooks/useSearchBarToggle';
import PrevieusActivityAcDetail from './PrevieusActivityAcDetail';

import useFormatCurrency from 'hooks/useFormatCurrency';
import { format } from 'date-fns';

export default function PrevPlan ({ item, setActiveTab }) {
  const formatCurrency = useFormatCurrency();
	const { plan_start, net_cost, total_payment } = item || {};
	
	const [expand, setExpand] = useState(false);
	const ref = useRef();
	
	useClickOutside(ref, () => {
    setExpand(false);
  });

	return (
		<Accordion
			ref={ref}
      expanded={expand}
      onChange={(e, expand) => {
        setExpand(expand);
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
      <Grid container>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" sx={{mt:2}}>{format(new Date(plan_start), 'MMMMMMMMM yyyy')}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="subtitle2">Net Cost</Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
            {formatCurrency(net_cost)}
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="subtitle2">Payments</Typography>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
            {formatCurrency(total_payment)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
        <Link
        onClick={()=> setActiveTab("Documents")}
            underline="always"
            sx={{ fontSize: '12px' }}
          >
            Download Subscription Statements and VAT and Tax Documents
          </Link>
        </Grid>
      </Grid>
    </AccordionSummary>
    <AccordionDetails>
      <PrevieusActivityAcDetail data={item}/>
    </AccordionDetails>
  </Accordion>
)}