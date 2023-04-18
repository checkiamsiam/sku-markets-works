import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
// @mui

import { useTheme } from '@mui/material/styles';
// layouts
import style from 'styles/Home.module.css';
import SKUMarquee from '../components/common/marquee/index';
import ContactUs from '../components/home/ContactUs';
import FAQSection from '../components/home/FAQSection';
import HomeTable from '../components/home/HomeTable';
import LandingPage from '../components/home/LandingPage';
import MapLocation from '../components/home/MapLocation';
import MarketSolution from '../components/home/MarketSolution';
import Plugin from '../components/home/Plugin';
import PricingCard from '../components/home/PricingCard';
import SkuSolution from '../components/home/SkuSolution';
import TrySkuMarket from '../components/home/TrySkuMarket';
import MainLayout from '../layouts/main';
// sections

// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Head>
        <title> Home | MUI</title>
      </Head>

      {progress}

      <main className={style.main}>
        <LandingPage />
      </main>
      <SKUMarquee />
      <MapLocation />
      <TrySkuMarket />
      <HomeTable />
      <MarketSolution />
      <SkuSolution />
      <Plugin />
      <FAQSection />
      <PricingCard />
      <ContactUs />
    </>
  );
}
