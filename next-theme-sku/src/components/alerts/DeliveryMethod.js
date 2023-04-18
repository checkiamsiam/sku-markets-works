import { Chip, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const DeliveryMethod = () => {
  return (
    <>
      <Box sx={{ border: "1px solid #ced4da", borderRadius: 1, mx: 5, my: 3 }}>
        <Box sx={{ m: 2, color: "#6C757D",}}>
          <Typography variant="h6">Delivery Method</Typography>
          <Typography variant="caption">
            Please follow the instructions below to connect your WhatsApp
          </Typography>
          <Box sx={{ pt: 3}}
          >
            <Chip sx={{color: "#6C757D",bgcolor:"transparent", fontSize: "18px"}} icon={<BsWhatsapp style={{ color: "#27C469", fontSize: "22px" }} />} label="WhatsApp" />
          </Box>
          <Typography variant="caption">
            SKU Markets Bot is
            <span style={{ color: "red" }}> not connected</span>
          </Typography>
          <Box sx={{ py: 1 }}>
            <Typography variant="caption" gutterBottom>
              To connect the bot to your WhatsApp account:
            </Typography>
            <Box sx={{ pl: 5 }}>
              <Typography variant="caption" gutterBottom display="block">
                1. Install WhatsApp on your phone, on your desktop, or access
                the web version.
              </Typography>
              <Typography variant="caption" display="block">
                2. Add your WhatsApp number in your account dashboard to connect
                your WhatsApp number with SKU Markets Bot
              </Typography>
              <Typography variant="caption">
                3. Your account becomes linked. You can refresh this page and
                check it.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ pt: 1}}>
            <Chip sx={{color: "#6C757D",bgcolor:"transparent", fontSize: "18px"}} icon={<MailOutlineIcon />} label="Email" />
          </Box>
          <Typography variant="caption">
          Active E-mail is:
            <span> <Link href="#" underline="none"> admin@2p.sa</Link></span>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DeliveryMethod;
