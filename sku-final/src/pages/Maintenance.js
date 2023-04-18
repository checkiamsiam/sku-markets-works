import { Box } from "@mui/system";
import React from "react";
import maintenanceUser from "../assets/images/svg/maintenance.svg";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Maintenance = () => {
   return (
      <>
         {/* content  */}
         <Box
            sx={{
               justifyContent: "center",
               justifyItems: "center",
               px: "10px",
               my: 15,
               
            }}
         >
            <Box
               sx={{
                  color: "GrayText",
                  textAlign: "center",
               }}
            >
               <Box>
                  <Box component='img' src={maintenanceUser} alt="svg" sx={{ height: 180, display: 'inline-block' }} />

                  <Typography variant="h5" sx={{ fontWeight: 600, mt: 3 }} gutterBottom>
                     Feature is Under Development
                  </Typography>
                  <Box
                     sx={{
                        fontSize: 14,
                     }}
                  >
                     We&apos;re making the system more awesome. We&apos;ll be back soon.
                  </Box>
               </Box>

               <Box sx={{ mt: 5 }}>
                  <HelpOutlineIcon
                     sx={{
                        fontSize: "4rem",
                        color: "white",
                        backgroundColor: "#0054FE",
                        borderRadius: "50%",
                     }}
                  />
                  <Box sx={{ fontWeight: 600, fontSize: 15, mt: 3 }}>DO YOU NEED SUPPORT?</Box>
                  <Box
                     sx={{
                        fontSize: 14,
                        mt: 1,
                     }}
                  >
                     If you have question, feel free to contact our support team at support@skumarkets.com
                  </Box>
               </Box>
            </Box>
         </Box>
      </>
   );
};

export default Maintenance;
