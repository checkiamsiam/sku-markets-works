import React from "react";
import { Container, Hidden } from "@mui/material";
import { Stack } from "@mui/system";
import ProductAnalysisCardOne from "./ProductAnalysisCardOne";
import ProductAnalysisCardTwo from "./ProductAnalysisCardTwo";

const ProductDetailsAnalysisSection = () => {
  return (
    <section>
      <Stack direction={{ sm: "column", lg: "row" }} spacing={2}>
        <>
          <ProductAnalysisCardOne />
          <Hidden only={["lg", "xl"]}>
            <p style={{ fontSize: "12px", color: "#7A797D" }}>
              Designed for users to instantly see the changes that occur on the SKU and predicts what will come next.
            </p>
          </Hidden>
        </>
        <>
          <ProductAnalysisCardTwo />
          <Hidden only={["lg", "xl"]}>
            <p style={{ fontSize: "12px", color: "#7A797D" }}>Designed for users to instantly see the SKU Description.</p>
          </Hidden>
        </>
      </Stack>

      <Hidden only={["xs", "sm", "md"]}>
        <Stack direction={{ sm: "column", lg: "row" }} spacing={2} hidden={{ sm: "false", lg: "true" }}>
          <div style={{ width: "60%" }}>
            <p style={{ fontSize: "12px", color: "#7A797D" }}>
              Designed for users to instantly see the changes that occur on the SKU and predicts what will come next.
            </p>
          </div>
          <div style={{ width: "40%" }}>
            <p style={{ fontSize: "12px", color: "#7A797D" }}>Designed for users to instantly see the SKU Description.</p>
          </div>
        </Stack>
      </Hidden>
    </section>
  );
};

export default ProductDetailsAnalysisSection;
