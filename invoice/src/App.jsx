import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import CreateInvoice from "./components/CreateInvoice";
import Invoice from "./components/Invoice";

function App() {
  return (
    <Router>
      <Container sx={{ margin: "2rem" }}>
        <Routes>
          <Route path="/" element={<CreateInvoice />} />
          <Route path="/invoice-show" element={<Invoice />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
