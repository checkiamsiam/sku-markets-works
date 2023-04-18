import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
// import ChartAndAnalysis from "../components/ChartAndAnalysis";
import ComparableTradeVolume from "../components/ComparableTradeVolume";
import ProductAnalysisTable from "../components/ProductAnalysisTable";
import ProductDetailsAnalysisSection from "../components/ProductDetailsAnalysisSection";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useEffect, useRef, useState } from "react";

const ProductDetails = () => {
 
  return (
    <Container maxWidth="xl"> 
      <ProductDetailsAnalysisSection />
      {/* <ChartAndAnalysis /> */}
      <ProductAnalysisTable />
      <ComparableTradeVolume />
    </Container>
  );
};

export default ProductDetails;
