import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
const Invoice = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Header />
      <Content />
    </Box>
  );
};

export default Invoice;
