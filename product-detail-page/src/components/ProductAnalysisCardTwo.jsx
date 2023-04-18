import React from "react";
import { Card, Link } from "@mui/material";
import { Stack } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";

const ProductAnalysisCardTwo = () => {
  return (
    <Card sx={{ padding: "1.5rem", width: { lg: "40%" }, borderRadius: "10px", boxShadow: 3 }}>
      <Stack direction="column" spacing={1.5} fontSize="12px" marginTop={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: "50%", fontWeight: "bold", color: "#7A797D" }}>
            Sku Title: <InfoIcon htmlColor="#999999" fontSize="3px" />
          </span>
          <span style={{ width: "50%", color: "#7A797D" }}>Portable Diaper Organizer</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: "50%", fontWeight: "bold", color: "#7A797D" }}>
            Sku Category: <InfoIcon htmlColor="#999999" fontSize="3px" />
          </span>
          <span style={{ width: "50%", color: "#7A797D" }}>
            <Link href="#" underline="none">
              Baby Products
            </Link>
          </span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: "50%", fontWeight: "bold", color: "#7A797D" }}>
            Sku Type: <InfoIcon htmlColor="#999999" fontSize="3px" />
          </span>
          <span style={{ width: "50%", color: "#7A797D" }}>Diapering</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: "50%", fontWeight: "bold", color: "#7A797D" }}>
            Sku Sub-Type: <InfoIcon htmlColor="#999999" fontSize="3px" />
          </span>
          <span style={{ width: "50%", color: "#7A797D" }}>Diaper Stackers & Organisers</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: "50%", fontWeight: "bold", color: "#7A797D" }}>
            Sku Brand: <InfoIcon htmlColor="#999999" fontSize="3px" />
          </span>
          <span style={{ width: "50%", color: "#7A797D" }}>
            {" "}
            <Link href="#" underline="none">
              Beauenty
            </Link>
          </span>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ width: "50%", fontWeight: "bold", color: "#7A797D" }}>
            Sku Description: <InfoIcon htmlColor="#999999" fontSize="3px" />
          </span>
          <span style={{ width: "50%", color: "#7A797D" }}>
            The diaper has a strong t divider that is securely attached to the sides and the bottom, and more.
          </span>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductAnalysisCardTwo;
