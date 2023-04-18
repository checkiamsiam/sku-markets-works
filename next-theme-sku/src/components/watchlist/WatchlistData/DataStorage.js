import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import redChart from "../../../assets/images/redChart.b6ce3a4df2925e5231c3.png";
import { HiArrowDownRight, HiArrowUpRight } from "react-icons/hi2";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const DataStorage = () => {
  /* Line progress */
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "red",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#4caf50" : "red",
    },
  }));

  /*Button Label */
  const [labelTime, setLabelTime] = useState("24 H");

  const handleLabelTime = (t) => {
    if (t === "24 H") {
      setLabelTime("07 D");
      console.log(labelTime);
    }
    if (t === "07 D") {
      setLabelTime("30 D");
    }
    if (t === "30 D") {
      setLabelTime("24 H");
    }
  };

  return (
    <>
        <Box sx={{ border: "1px solid #ced4da", borderRadius: 1, mx:5, mb:5 }}>
          <Box sx={{ flexGrow: 1, mx: 3, my: 5 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={2.4}>
                <Grid
                  sx={{ border: "1px solid #ced4da", borderRadius: 1, p: 1 }}
                  container
                  spacing={1}
                >
                  <Grid item xs={8} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "10px" }}>
                        Watchlist Marketcap
                      </Typography>
                      <Chip
                        size="small"
                        onClick={() => handleLabelTime(labelTime)}
                        label={labelTime}
                        color="primary"
                      />
                    </Box>
                    <Typography sx={{ fontSize: "10px", pb: 2 }}>
                    <span style={{ fontWeight: "bold" }}> $319.54B </span>
                      <span style={{ fontSize: "8px", color: "red" }}>
                        -12.41% <HiArrowDownRight />
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={redChart}
                        width="60px"
                        height="40px"
                        alt="redChart"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2.4}>
                <Grid
                  sx={{ border: "1px solid #ced4da", borderRadius: 1, p: 1 }}
                  container
                  spacing={1}
                >
                  <Grid item xs={8} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "10px" }}>
                        Watchlist Marketcap
                      </Typography>
                      <Chip
                        size="small"
                        onClick={() => handleLabelTime(labelTime)}
                        label={labelTime}
                        color="primary"
                      />
                    </Box>
                    <Typography sx={{ fontSize: "10px", pb: 2 }}>
                      <span style={{ fontWeight: "bold" }}> $319.54B </span>
                      <span style={{ fontSize: "8px", color: "green" }}>
                        0.64% <HiArrowUpRight />
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={redChart}
                        width="60px"
                        height="40px"
                        alt="redChart"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2.4}>
                <Grid
                  sx={{ border: "1px solid #ced4da", borderRadius: 1, p: 1 }}
                  container
                  spacing={1}
                >
                  <Grid item xs={8} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "10px" }}>
                        Watchlist Marketcap
                      </Typography>
                      <Chip
                        size="small"
                        onClick={() => handleLabelTime(labelTime)}
                        label={labelTime}
                        color="primary"
                      />
                    </Box>
                    <Typography sx={{ fontSize: "10px", pb: 2 }}>
                      <span style={{ fontWeight: "bold" }}> $319.54B </span>
                      <span style={{ fontSize: "8px", color: "green" }}>
                        0.64% <HiArrowUpRight />
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={redChart}
                        width="60px"
                        height="40px"
                        alt="redChart"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2.4}>
                <Grid
                  sx={{ border: "1px solid #ced4da", borderRadius: 1, p: 1 }}
                  container
                  spacing={1}
                >
                  <Grid item xs={8} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "10px" }}>
                        Watchlist Marketcap
                      </Typography>
                      <Chip
                        size="small"
                        onClick={() => handleLabelTime(labelTime)}
                        label={labelTime}
                        color="primary"
                      />
                    </Box>
                    <Typography sx={{ fontSize: "10px", pb: 2 }}>
                      <span style={{ fontWeight: "bold" }}> $319.54B </span>
                      <span style={{ fontSize: "8px", color: "green" }}>
                        0.64% <HiArrowUpRight />
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={redChart}
                        width="60px"
                        height="40px"
                        alt="redChart"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2.4}>
                <Grid
                  sx={{ border: "1px solid #ced4da", borderRadius: 1, p: 1 }}
                  container
                  spacing={1}
                >
                  <Grid item xs={8} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "10px" }}>
                        Gainers/losers Number
                      </Typography>
                      <Chip
                        size="small"
                        onClick={() => handleLabelTime(labelTime)}
                        label={labelTime}
                        color="primary"
                      />
                    </Box>
                  </Grid>
                  <Box sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress sx={{bgColor:"red"}} variant="determinate" value={67} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "10px", fontWeight: "bold", pt: 1 }}
                      >
                        1555 (67%)
                      </Typography>
                      <Typography
                        sx={{ fontSize: "10px", fontWeight: "bold", pt: 1 }}
                      >
                        780 (33%)
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </>
  );
};

export default DataStorage;
