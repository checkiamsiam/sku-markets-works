import React from 'react';
import { Grid, CircularProgress, Stack } from '@mui/material';
import SubsAndBillingTop from './SubsAndBillingTop';
import BillingOverviewOther from './BillingOverviewOther';
import PreviusActivities from './PreviusActivities';

import { useGetAllSubscriptionsQuery } from 'features/subscription/subscriptionAPI';

export default function SubsNBilling({ setActiveTab }) {
	const { data, isLoading, isFetching } = useGetAllSubscriptionsQuery("");
	
	if(isLoading || isFetching) {
		return (
			<Stack direction='row' alignItems='center' justifyContent='center' sx={{minHeight: '50vh'}}>
				<CircularProgress />
			</Stack>
		)}

return (
	<Grid container spacing={5}>
		<Grid item xs={12} md={12}>
			<SubsAndBillingTop setActiveTab={setActiveTab} />
		</Grid>
		<Grid item xs={12} md={12}>
			<BillingOverviewOther setActiveTab={setActiveTab} />
		</Grid>
		<Grid item xs={12} md={12}>
			<PreviusActivities setActiveTab={setActiveTab} />
		</Grid>
	</Grid>
)}