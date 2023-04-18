import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineMail, AiOutlineWhatsApp, AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
import style from "./styles/Home.module.css";

const FAQSection = () => {
	const router = useRouter();
	return (
		<Container id="FAQSection">
			<div style={{ textAlign: "center" }}>
				<Typography variant="h4" component="h4">
					Frequently Asked Questions
				</Typography>
				<Typography component="h4">
					If you can’t find the answer to your question here, feel free to contact our support team.
				</Typography>

				<Box sx={{ my: 3 }}>
					<button onClick={() => router.push("mailto:support@skumarkets.com")} className={style.faqbtnMail}>
						<AiOutlineMail /> EMAIL US YOUR QUESTION{" "}
					</button>
					<button
						onClick={() => router.push("https://twitter.com/SKUmarkets")}
						className={style.faqbtnTwieet}
					>
						{" "}
						<AiOutlineTwitter /> SEND US A TWEET{" "}
					</button>
				</Box>
			</div>
			<Grid container>
				<Grid item sx={{ display: "flex" }} lg={6}>
					<div>
						<h4
							style={{
								backgroundColor: "#cbdbff",
								borderRadius: "50%",
								color: "#0052ff",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "30px",
								marginRight: "10px",
								height: "30px",
							}}
						>
							{" "}
							Q.{" "}
						</h4>
					</div>
					<div>
						<h4 style={{ color: "gray" }}> How dose our service work? </h4>
						<p style={{ fontSize: "12px", color: "gray" }}>
							{" "}
							We do collecting data cross internet, calculating and reflecting it to your dashboard. Weare
							able to provide with top needed information to take the right business decisions on the fastest
							way !{" "}
						</p>
					</div>
				</Grid>
				<Grid item sx={{ display: "flex" }} lg={6}>
					<div>
						<h4
							style={{
								backgroundColor: "#cbdbff",
								borderRadius: "50%",
								color: "#0052ff",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "30px",
								marginRight: "10px",
								height: "30px",
							}}
						>
							{" "}
							Q.{" "}
						</h4>
					</div>
					<div>
						<h4 style={{ color: "gray" }}> How dose our service work? </h4>
						<p style={{ fontSize: "12px", color: "gray" }}>
							{" "}
							We do collecting data cross internet, calculating and reflecting it to your dashboard. Weare
							able to provide with top needed information to take the right business decisions on the fastest
							way !{" "}
						</p>
					</div>
				</Grid>
				<Grid item sx={{ display: "flex" }} lg={6}>
					<div>
						<h4
							style={{
								backgroundColor: "#cbdbff",
								borderRadius: "50%",
								color: "#0052ff",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "30px",
								height: "30px",
								marginRight: "10px",
							}}
						>
							{" "}
							Q.{" "}
						</h4>
					</div>
					<div>
						<h4 style={{ color: "gray" }}> How dose our service work? </h4>
						<p style={{ fontSize: "12px", color: "gray" }}>
							{" "}
							We do collecting data cross internet, calculating and reflecting it to your dashboard. Weare
							able to provide with top needed information to take the right business decisions on the fastest
							way !{" "}
						</p>
					</div>
				</Grid>
				<Grid item sx={{ display: "flex" }} lg={6}>
					<div>
						<h4
							style={{
								backgroundColor: "#cbdbff",
								borderRadius: "50%",
								color: "#0052ff",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "30px",
								marginRight: "10px",
								height: "30px",
							}}
						>
							{" "}
							Q.{" "}
						</h4>
					</div>
					<div>
						<h4 style={{ color: "gray" }}> How dose our service work? </h4>
						<p style={{ fontSize: "12px", color: "gray" }}>
							{" "}
							We do collecting data cross internet, calculating and reflecting it to your dashboard. Weare
							able to provide with top needed information to take the right business decisions on the fastest
							way !{" "}
						</p>
					</div>
				</Grid>
				<Grid item sx={{ display: "flex" }} lg={6}>
					<div>
						<h4
							style={{
								backgroundColor: "#cbdbff",
								borderRadius: "50%",
								color: "#0052ff",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "30px",
								marginRight: "10px",
								height: "30px",
							}}
						>
							{" "}
							Q.{" "}
						</h4>
					</div>
					<div>
						<h4 style={{ color: "gray" }}> How dose our service work? </h4>
						<p style={{ fontSize: "12px", color: "gray" }}>
							{" "}
							We do collecting data cross internet, calculating and reflecting it to your dashboard. Weare
							able to provide with top needed information to take the right business decisions on the fastest
							way !{" "}
						</p>
					</div>
				</Grid>
				<Grid item sx={{ display: "flex" }} lg={6}>
					<div>
						<h4
							style={{
								backgroundColor: "#cbdbff",
								borderRadius: "50%",
								color: "#0052ff",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "30px",
								marginRight: "10px",
								height: "30px",
							}}
						>
							{" "}
							Q.{" "}
						</h4>
					</div>
					<div>
						<h4 style={{ color: "gray" }}> How dose our service work? </h4>
						<p style={{ fontSize: "12px", color: "gray" }}>
							{" "}
							We do collecting data cross internet, calculating and reflecting it to your dashboard. Weare
							able to provide with top needed information to take the right business decisions on the fastest
							way !{" "}
						</p>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FAQSection;
