import { Grid, Paper, Switch, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import style from "./styles/PricingCard.module.css";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PricingCard = () => {
	const label = { inputProps: { "aria-label": "Switch demo" } };

	return (
		<Container maxWidth="xl" id="PricingPlans">
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Box sx={{ textAlign: "center", width: "400px" }}>
					<Typography sx={{ marginY: "20px" }} variant="h4" component="h5">
						Pricing Plans
					</Typography>
					<Typography sx={{ fontSize: "13px", textAlign: "center" }} component="p">
						Start with one of our preselected plans to analyse & monitors Top Ranked & Trendning SKUs. You can
						save 20% by choosing Annually subscription
					</Typography>
					<div style={{ marginTop: "32px", color: "gray" }}>
						Mountly <Switch size="medium" {...label} /> Annually
					</div>
				</Box>
			</div>
			<Grid container spacing={2} sx={{ marginY: "40px" }}>
				<Grid item lg={2}>
					<Paper elevation={2} sx={{ padding: "20px", borderRadius: "12px", height: "400px" }}>
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
								LAUNCH
							</Typography>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Typography sx={{ fontSize: "10px", width: "130px" }} component="p">
									Perfect for startups and growing businesses
								</Typography>
							</div>
							<Typography
								sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
								variant="h6"
								component="h6"
							>
								{" "}
								250/mo{" "}
							</Typography>
							<button className={style.payment_btn_Style}>GET STARTED NOW</button>
							<Typography
								sx={{
									fontSize: "11px",
									color: "gray",
									fontWeight: "600",
									marginY: "15px",
								}}
								component="p"
							>
								Up to 50,000 Top Ranked SKUs Cross Countries & Categories
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
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Track & Alert SKUs
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Max, Min Prices & SKUs Rating
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Expected Trade vloume & SOH
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Estimated Market Capital
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Opportunities & Competitors
									</li>
								</ul>
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item lg={2}>
					<Paper elevation={2} sx={{ padding: "20px", borderRadius: "12px", height: "400px" }}>
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
								GROW
							</Typography>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Typography sx={{ fontSize: "10px", width: "130px" }} component="p">
									Ideal for small to medium-sized organizations
								</Typography>
							</div>
							<Typography
								sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
								variant="h6"
								component="h6"
							>
								{" "}
								SAR 400/mo
							</Typography>
							<button className={style.payment_btn_Style}>GET STARTED NOW</button>
							<Typography
								sx={{
									fontSize: "11px",
									color: "gray",
									fontWeight: "600",
									marginY: "15px",
								}}
								component="p"
							>
								Up to 100,000 Top Ranked SKUs Cross Countries & Categories
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
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Track & Alert SKUs
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Max, Min Prices & SKUs Rating
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Expected Trade vloume & SOH
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Estimated Market Capital
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Opportunities & Competitors
									</li>
								</ul>
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item lg={2}>
					<Paper elevation={2} sx={{ padding: "20px", borderRadius: "12px", height: "400px" }}>
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
								BUSINESS
							</Typography>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Typography sx={{ fontSize: "10px", width: "130px" }} component="p">
									Customized for specific organization SKUs
								</Typography>
							</div>
							<Typography
								sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
								variant="h6"
								component="h6"
							>
								{" "}
								SAR 600/mo{" "}
							</Typography>
							<button className={style.payment_btn_Style}>GET STARTED NOW</button>
							<Typography
								sx={{
									fontSize: "11px",
									color: "gray",
									fontWeight: "600",
									marginY: "15px",
								}}
								component="p"
							>
								Up to Unlimited Of Your SKUs Cross Countries & Categories
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
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Grow Plan +
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Your SKUs Buybox Prices Management
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Your SKUs Stock Management
									</li>
								</ul>
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item lg={2}>
					<Paper elevation={2} sx={{ padding: "20px", borderRadius: "12px", height: "400px" }}>
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
								PROFESSIONAL
							</Typography>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Typography sx={{ fontSize: "10px", width: "200px" }} component="p">
									Designed for higher organizations Need A dedicated Account Manager
								</Typography>
							</div>
							<Typography
								sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
								variant="h6"
								component="h6"
							>
								{" "}
								SAR 1000/mo
							</Typography>
							<button className={style.payment_btn_Style}>GET STARTED NOW</button>
							<Typography
								sx={{
									fontSize: "11px",
									color: "gray",
									fontWeight: "600",
									marginY: "15px",
								}}
								component="p"
							>
								Up to Unlimited Of Your SKUs Cross Countries & Categories
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
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Business Plan +
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Ecommerce Specialist Account Manager to
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Support your Business
									</li>
								</ul>
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item lg={2}>
					<Paper
						elevation={2}
						sx={{
							padding: "20px",
							borderRadius: "12px",
							height: "400px",
							position: "relative",
						}}
					>
						<span
							style={{
								color: "white",
								top: "0",
								left: "-13px",
								fontStyle: "oblique",
								position: "absolute",
								padding: "3px 13px 3px 8px",
								backgroundColor: "#0d6efd",
								borderRadius: "5px",
							}}
						>
							{" "}
							Soon!{" "}
						</span>
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
								ENTERPRISE
							</Typography>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Typography sx={{ fontSize: "10px", width: "130px" }} component="p">
									Designed for higher volumes <br /> organizations
								</Typography>
							</div>
							<Typography
								sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
								variant="h6"
								component="h6"
							>
								{" "}
								Contact Us{" "}
							</Typography>
							<button className={style.payment_btn_Style}>WHATSAPP US</button>
							<Typography
								sx={{
									fontSize: "11px",
									color: "gray",
									fontWeight: "600",
									marginY: "15px",
								}}
								component="p"
							>
								Up to Unlimited SKUs <br />
								Cross Countries & Categories
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
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Professional Plan +
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Ecommerce Platforms & Shopping Cats
										Integration
									</li>
								</ul>
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item lg={2}>
					<Paper
						elevation={2}
						sx={{
							padding: "20px",
							borderRadius: "12px",
							height: "400px",
							position: "relative",
						}}
					>
						<span
							style={{
								color: "white",
								top: "0",
								left: "-13px",
								position: "absolute",
								padding: "3px 13px 3px 8px",
								backgroundColor: "#0d6efd",
								borderRadius: "5px",
								fontStyle: "oblique",
							}}
						>
							{" "}
							Soon!{" "}
						</span>
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
								ENTERPRISE PLUS
							</Typography>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Typography sx={{ fontSize: "10px", width: "130px" }} component="p">
									Customized for sales channels Management
								</Typography>
							</div>
							<Typography
								sx={{ fontSize: "17px", color: "gray", marginY: "10px" }}
								variant="h6"
								component="h6"
							>
								{" "}
								Contact Us
							</Typography>
							<button className={style.payment_btn_Style}>WHATSAPP US</button>
							<Typography
								sx={{
									fontSize: "11px",
									color: "gray",
									fontWeight: "600",
									marginY: "15px",
								}}
								component="p"
							>
								Up to Unlimited SKUs Cross Countries & Categories
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
										<AiOutlineCheckCircle style={{ color: "blue" }} /> Enterprise Plan +
									</li>
									<li style={{ marginTop: "10px", marginBottom: "10px" }}>
										{" "}
										<AiOutlineCheckCircle style={{ color: "blue" }} /> A complete Sales Channels Management{" "}
										<br /> Platform
									</li>
								</ul>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default PricingCard;
