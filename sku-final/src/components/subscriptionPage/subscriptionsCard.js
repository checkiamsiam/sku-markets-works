import { Box, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AiOutlineCheckCircle } from "react-icons/ai";
import style from "../../styles/PricingCard.module.css";

const SubscriptionsCard = ({ card }) => {
  const {
    cardName,
    purpose,
    price,
    rank,
    serviceOne,
    serviceTwo,
    serviceThree,
    serviceFour,
    serviceFive,
  } = card;
  return (
    <Grid item>
      <Paper
        elevation={2}
        sx={{ padding: "20px", borderRadius: "12px",  }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#0d6efd",
              fontWeight: "600",
              marginY: "20px",
            }}
            component="p"
          >
            {cardName}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "10px", width: "130px" }} component="p">
              {purpose}
            </Typography>
          </div>
          <Typography
            sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
            variant="h6"
            component="h6"
          >
            {" "}
            {price}{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              color: "gray",
              fontWeight: "600",
              marginY: "15px",
            }}
            component="p"
          >
            {rank}
          </Typography>
          <Box>
            <ul
              style={{
                textAlign: "center",
                fontSize: "10px",
                listStyle: "none",
                paddingLeft: "0",
                color: "gray",
              }}
            >
              <li style={{ marginTop: "10px", marginBottom: "10px" }}>
                {" "}
                <AiOutlineCheckCircle style={{ color: "blue" }} /> {serviceOne}
              </li>
              <li style={{ marginTop: "10px", marginBottom: "10px" }}>
                {" "}
                <AiOutlineCheckCircle style={{ color: "blue" }} /> {serviceTwo}
              </li>
              <li style={{ marginTop: "10px", marginBottom: "10px" }}>
                {" "}
                <AiOutlineCheckCircle style={{ color: "blue" }} />{" "}
                {serviceThree}
              </li>
              <li style={{ marginTop: "10px", marginBottom: "10px" }}>
                {" "}
                <AiOutlineCheckCircle style={{ color: "blue" }} /> {serviceFour}
              </li>
              <li style={{ marginTop: "10px", marginBottom: "10px" }}>
                {" "}
                <AiOutlineCheckCircle style={{ color: "blue" }} /> {serviceFive}
              </li>
            </ul>
          </Box>
          <button className={style.payment_btn_Style}>SELECT</button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SubscriptionsCard;