import { Box, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import plugin from "../../assets/images/plugin.png";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

const Plugin = () => {
	return (
		<Container sx={{ marginY: "150px" }} maxWidth={"lg"}>
			<Grid container spacing={2}>
				<Grid item lg={4} sx={{ textAlign: "center" }}>
					<Typography variant="h4" component="h4">
						Plugins
					</Typography>
					<Typography sx={{ marginY: "15px", fontSize: "13px", padding: "10px" }} component="p">
						Our SKU Markets platform plugs easily into some of the most popular Ecommerce platforms & shopping
						carts in the world
					</Typography>
					<Typography sx={{ marginY: "15px", fontSize: "13px", padding: "10px" }} component="p">
						These plugins help you get started without any programming needed. You can use the plugins for a
						seamless integration that easily allows you to add on your multi channels to take control of the
						most major Ecommerce & Shopping Carts platforms. Everything your Ecommerce needs to succeed.
					</Typography>
				</Grid>
				<Grid sx={{ marginY: "auto" }} item lg={4}>
					<TextField
						size="small"
						id="standard-basic"
						label="Find your PlatFrom"
						fullWidth
						variant="standard"
					/>
					<br />
					<button
						style={{
							border: "none",
							backgroundColor: "transparent",
							color: "blue",
						}}
					>
						<Box
							component={Link}
							href="/maintenance"
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
								textDecoration: "none",
								color: "blue",
							}}
						>
							Learn about integration
							<HiOutlineArrowNarrowRight />
						</Box>
					</button>
				</Grid>
				<Grid item lg={4}>
					<Image style={{ maxWidth: "100%" }} src={plugin} alt="" />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Plugin;
