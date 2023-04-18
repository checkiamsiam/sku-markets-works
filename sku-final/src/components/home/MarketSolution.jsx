import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import Work1 from "../../assets/images/work-1.png";
import Work2 from "../../assets/images/work-2.png";
import Work3 from "../../assets/images/work-3.png";

const MarketSolution = () => {
	return (
		<Container sx={{ marginY: "150px" }} maxWidth="lg" id="MarketSolution">
			<Typography sx={{ textAlign: "center" }} variant="h4" component="h5">
				How SKU Markets Solution works <br /> and help your business?
			</Typography>
			<Grid sx={{ marginY: "50px" }} container spacing={2}>
				<Grid item lg={4}>
					<Box
						sx={{
							textAlign: "center",
							padding: "18px",
							borderRadius: "11px",
						}}
					>
						<Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
							<img height={100} width={100} src={Work1} alt=" " />
						</Box>
						<Typography sx={{ marginY: "20px", fontSize: "15px" }} component="p">
							Simply we provide you with the top ranked SKUs cross online marketplaces, countries and
							Categories even your SKUs to manage and control it cross sales channels and know the
							opportunities also your competitors stores
						</Typography>
					</Box>
				</Grid>
				<Grid item lg={4}>
					<Box
						sx={{
							textAlign: "center",
							padding: "18px",
							boxShadow:'rgb(0 0 0 / 40%) -40px 40px 80px',
							borderRadius: "11px",
						}}
					>
						<Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
							<img height={100} width={100} src={Work2} alt=" " />
						</Box>
						<Typography sx={{ marginY: "20px", fontSize: "15px" }} component="p">
							We measure it for you to make it ready to build your decisions on the actual situation of
							marketplaces. We also preparing your actions to control, analysis and interact to scale your
							Ecommerce
						</Typography>
					</Box>
				</Grid>
				<Grid item lg={4}>
					<Box
						sx={{
							textAlign: "center",
							padding: "18px",
							borderRadius: "11px",
							alignItems:'center'
						}}
					>
						<Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
							<img height={100} width={100} src={Work3} alt=" " />
						</Box>
						<Typography sx={{ marginY: "20px", fontSize: "15px" }} component="p">
							Keep it on our bots to notify you by our automated WhatsApp alerts to speed up your actions &
							save efforts finding good in heath SKUs to expand your Ecommerce and manage it to your sales
							channels
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default MarketSolution;
