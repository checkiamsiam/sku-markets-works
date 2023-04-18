import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GifHero from "../../assets/images/Web GIF 3_2.gif";
import heroJumpLgo from "../../assets/images/logo2.png";
import style from "./styles/landingPage.module.css";
import Grid from "@mui/material/Grid";
import { Grid3x3 } from "@mui/icons-material";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import backGroud from "../../assets/images/Map AR-01.png";
import { useRouter } from "next/router";

const LandingPage = () => {
	const router = useRouter();

	return (
		<Container maxWidth="lg">
			<Grid container spacing={2}>
				<Grid item xs={12} lg={6}>
					<div className={style.landingFirstSectionTxt}>
						<div onClick={() => router.push("/signup")} className={style.jumpingPort}>
							<Image width={15} height={15} src={heroJumpLgo} alt=" hero jump logo" />{" "}
							<span> Jump start your portfolio </span>
							<HiOutlineArrowNarrowRight />
						</div>
						<div>
							<h1 className={style.Landingh1text}>
								A Complete Insights, Analytics, Statistics & Managemet Platform Built to Supercharge Your
								Ecommerce
							</h1>
							<h6 className={style.disFontStyle}>
								Track it, Get Notified, Added it, Manage to Sell it to grow your Ecommerce
							</h6>
							<p className="">SKU Markets is the easiest place to scale your Ecommerce</p>

							<h6 className="">Sign up and get started today</h6>
						</div>
						<button onClick={() => router.push("/signup")} className={style.landingSignUp}>
							Sign Up
						</button>
					</div>
				</Grid>
				<Grid item xs={12} lg={6}>
					<div className="">
						<Image className={style.landingFirstSectionGif} src={GifHero} alt="Gif for searching " />
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default LandingPage;
