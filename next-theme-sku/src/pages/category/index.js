import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import tommyPic from "../../assets/images/baby.png";
import { Box } from "@mui/system";
import Image from "next/image";
import Button from "@mui/material/Button";
import CartMap from "../../assets/images/product-map1.png";
import SahudiaLogo from "../../assets/images/noon-saudi.svg";
import Chip from "@mui/material/Chip";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from "react-icons/hi";
import { FaCartPlus, FaHouseDamage, FaCubes } from "react-icons/fa";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

Category.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function Category() {
   const router = useRouter();
   const [labelTime, setLabelTime] = useState("24 H");

   const handleLabelTime = (t) => {
      if (t === "24 H") {
         setLabelTime("07 D");
         console.log(labelTime);
      }
      if (t === "07 D") {
         setLabelTime("14 D");
      }
      if (t === "14 D") {
         setLabelTime("30 D");
      }
      if (t === "30 D") {
         setLabelTime("24 H");
      }
   };

   return (
      <>
         <Box
            sx={{
               px: {
                  xs: 3,
                  md: 5,
               },
            }}
         >
            {/* First Section  */}
            <Paper variant="outlined" sx={{ mt: 4, color: "GrayText", p: 3 }}>
               <Stack
                  direction={{ xs: "column", lg: "row" }}
                  justifyContent={{ xs: "center", lg: "space-between" }}
               >
                  {/* Product Image & Name  */}
                  <Box sx={{ mb: { xs: 5, lg: 0 } }}>
                     <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
                        <Box>
                           <Stack direction="row" spacing={1} alignItems="center">
                              <Box
                                 component={Image}
                                 src={tommyPic}
                                 alt="product"
                                 sx={{
                                    height: "80px",
                                    width: "80px",
                                 }}
                              />

                              <Box sx={{ fontSize: "14px", color: "GrayText" }}>Baby Products</Box>
                           </Stack>
                           <br />
                           <Box
                              sx={{
                                 fontSize: "10px",
                                 color: "GrayText",
                              }}
                           >
                              Category  Insights And Analytics Dashboard.{" "}
                           </Box>
                        </Box>
                     </Stack>
                  </Box>

                  {/* Volume   */}
                  <Box sx={{ textAlign: "center", mb: { xs: 5, lg: 0 } }}>
                     <Box
                        sx={{
                           display: {
                              xs: "none",
                              lg: "block",
                           },
                        }}
                     >
                        Volume
                     </Box>
                     <Box sx={{ fontSize: "15px", fontWeight: 400, mt: 4 }}>
                        SAR 18.87M <Box sx={{ color: "red", display: "inline" }}>-4.04%</Box>
                     </Box>
                     <Box sx={{ fontSize: "10px", pt: 3 }}>Updated about 1 hour ago</Box>
                  </Box>

                  {/*Graph */}
                  <Box sx={{ mb: { xs: 5, lg: 0 } }}>
                     <Stack
                        direction="row"
                        justifyContent={{ xs: "space-between", lg: "start" }}
                        sx={{ mx: "auto", width: { xs: "100%", md: "400px", lg: "100%" } }}
                     >
                        <Box
                           sx={{
                              display: {
                                 xs: "block",
                                 lg: "none",
                              },
                           }}
                        >
                           Volume
                        </Box>

                        <Chip
                           label={labelTime}
                           onClick={() => handleLabelTime(labelTime)}
                           size="small"
                           sx={{
                              borderRadius: "5px",
                              fontSize: "12px",
                              py: "0px",
                           }}
                           color="primary"
                        />
                     </Stack>
                     <Box
                        sx={{
                           height: "70px",
                           width: { md: "270px", xs: "200px", mx: "auto" },
                           mt: 2,
                        }}
                        component={Image}
                        src={CartMap}
                        alt="graph"
                     />
                  </Box>

                  <Box
                     sx={{
                        fontSize: "12px",
                     }}
                  >
                     <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={10}>
                        <Box>Marketplace</Box>
                        <Box
                           onClick={() => router.push("/marketPlace")}
                           sx={{ height: "30px", width: "40px", cursor: "pointer" }}
                           component={Image}
                           src={SahudiaLogo}
                           alt="SahudiaLogo"
                        />
                     </Stack>
                     <Stack direction="row" justifyContent="space-between" spacing={10}>
                        <Box>Brands</Box>
                        <Box>22000</Box>
                     </Stack>
                     <Stack direction="row" justifyContent="space-between" spacing={10}>
                        <Box>SKUs</Box>
                        <Box>120</Box>
                     </Stack>
                     <Stack direction="row" justifyContent="space-between" spacing={10}>
                        <Box>Type</Box>
                        <Box>1127</Box>
                     </Stack>
                     <Stack direction="row" justifyContent="space-between" spacing={10}>
                        <Box>Sub-Types</Box>
                        <Box>1127</Box>
                     </Stack>
                  </Box>
               </Stack>
            </Paper>

            {/* Second Section  */}
            <Paper variant="outlined" sx={{ mt: 4, color: "GrayText", p: 3 }}>
               <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <IoIosPeople size="3rem" color="#0052FF" />
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Stores <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>

                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <HiOutlineTrendingUp size="3rem" color="#0052FF" />
                        {/* <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-dots" /> */}
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Live SKUs <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>

                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <HiOutlineTrendingDown size="3rem" color="#0052FF" />
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Not Live SKUs <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>

                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <FaCartPlus size="3rem" color="#0052FF" />
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Fulfilled by MP <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>

                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <FaHouseDamage size="3rem" color="#0052FF" />
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Fulfilled by stores <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>

                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <FaCubes size="3rem" color="#0052FF" />
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Stock On Hand <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>

                  <Grid item xs={6} md={4} lg={1.713}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <BsFillCloudArrowUpFill size="3rem" color="#0052FF" />
                        <Box sx={{ fontSize: "12px", color: "GrayText", textAlign: "end" }}>
                           Marketplace Share <br />
                           3900
                        </Box>
                     </Stack>
                  </Grid>
               </Grid>
            </Paper>
            <Box
               sx={{
                  fontSize: 11,
                  mt: 1,
                  color: "GrayText",
               }}
            >
               Designed for users to instantly see the changes that occur on the Category and predicts what will
               come next.
            </Box>
         </Box>
      </>
   );
};


