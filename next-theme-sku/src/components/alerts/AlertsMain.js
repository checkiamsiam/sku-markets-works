import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DeliveryMethod from "./DeliveryMethod";
import NewAlert from "./NewAlert";

const AlertsMain = () => {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography sx={{ pb: 1, mx: 5 }}>SKUs Signals, Stock and Price Alerts</Typography>
      </Box>
      <NewAlert />
      <DeliveryMethod/>
    </>
  );
};

export default AlertsMain;
