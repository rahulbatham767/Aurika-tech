import {
  Box,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Container,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toWords } from "number-to-words";
import PDFDocument from "./PDFDocument";

const Content = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("saveData");
    if (data) {
      setInvoiceData(JSON.parse(data));
    }
  }, []);
  const handleDownloadPDF = () => {
    // Generate PDF content
    const pdfContent = <PDFDocument invoiceData={invoiceData} />;

    // Create a blob containing the PDF data
    const blob = new Blob([pdfContent], { type: "application/pdf" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element and click it to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  };
  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  const {
    sellerDetails,
    billingDetails,
    shippingDetails,
    orderDetails,
    invoiceDetails,
    items,
  } = invoiceData;

  const calculateTotal = (items) => {
    return items.reduce(
      (acc, item) => ({
        netAmount: acc.netAmount + item.netAmount,
        taxAmount: acc.taxAmount + item.taxAmount,
        totalAmount: acc.totalAmount + item.totalAmount,
      }),
      { netAmount: 0, taxAmount: 0, totalAmount: 0 }
    );
  };

  const totals = calculateTotal(items);

  return (
    <Container>
      <Stack direction={"row"}>
        <Box flex={1}>
          <p className="font-bold">Sold By:</p>
          <p>{sellerDetails.name}</p>
          <p>{sellerDetails.address}</p>
          <p>{sellerDetails.city}</p>
          <p>{sellerDetails.state}</p>
          <p>{sellerDetails.pincode}</p>
        </Box>
        <Box flex={1}>
          <p className="font-bold">Billing Address:</p>
          <p>{billingDetails.name}</p>
          <p>{billingDetails.address}</p>
          <p>{billingDetails.city}</p>
          <p>{billingDetails.state}</p>
          <p>{billingDetails.pincode}</p>
          <p>
            <span className="font-bold"> State/UT Code:</span>
            {billingDetails.stateCode}
          </p>
        </Box>
      </Stack>
      <Box>
        <p>
          <span className="font-bold"> PAN NO:</span> {sellerDetails.panNo}
        </p>
        <p>
          <span className="font-bold"> GST Registration No.:</span>
          {sellerDetails.gstNo}
        </p>
      </Box>
      <Stack direction={"row"}>
        <Box flex={1}></Box>
        <Box flex={1}>
          <p className="font-bold">Shipping Address:</p>
          <p>{shippingDetails.name}</p>
          <p>{shippingDetails.address}</p>
          <p>{shippingDetails.city}</p>
          <p>{shippingDetails.state}</p>
          <p>{shippingDetails.pincode}</p>
          <p>
            <span className="font-bold"> State/UT Code:</span>
            {shippingDetails.stateCode}
          </p>
          <p>
            <span className="font-bold"> Place of supply:</span>
            {sellerDetails.placeOfSupply}
          </p>
        </Box>
      </Stack>
      <Stack direction={"row"} margin={2}>
        <Box flex={1}>
          <p>
            <span className="font-bold"> Order Number:</span>
            {orderDetails.orderNo}
          </p>
          <p>
            <span className="font-bold"> Order Date:</span>
            {orderDetails.orderDate}
          </p>
        </Box>
        <Box flex={1}>
          <p>
            <span className="font-bold"> Invoice Number:</span>
            {invoiceDetails.invoiceNo}
          </p>
          <p>
            <span className="font-bold"> Invoice Date:</span>
            {invoiceDetails.invoiceDate}
          </p>
        </Box>
      </Stack>
      <Box
        border="2px solid #e2e8f0"
        borderRadius="md"
        style={{ maxWidth: "800px" }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="nine column table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "gray" }}>
                <TableCell sx={{ fontWeight: "bold" }}>SL</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} width={"500px"}>
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Net Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Tax Rate
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tax Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Tax Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.netAmount}</TableCell>
                  <TableCell align="right">{item.taxRate}%</TableCell>
                  <TableCell>{item.taxType}</TableCell>
                  <TableCell align="right">{item.taxAmount}</TableCell>
                  <TableCell align="right">{item.totalAmount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right" className="font-bold">
                  TOTAL:
                </TableCell>
                <TableCell align="right" className="font-bold">
                  {totals.netAmount}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" className="font-bold">
                  {totals.taxAmount}
                </TableCell>
                <TableCell align="right" className="font-bold">
                  {totals.totalAmount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={9}>
                  <p className="font-bold">Amount in Words:</p>
                  <p className="font-bold">{toWords(totals.totalAmount)}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}></TableCell>
                <TableCell colSpan={3} align="right">
                  <p className="font-bold">For Varasiddhi Silk Exports:</p>
                  <Box
                    border={"1px solid"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"80px"} // Adjusted height for better image display
                    marginY={2} // Added vertical margin for spacing
                  >
                    <img
                      src={invoiceData.signatureImage}
                      alt="Signature"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        padding: "5px",
                      }}
                    />
                  </Box>
                  <p className="font-bold">Authorized Signature</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <p className="font-bold">
          Whether tax is Payable under reverse charge - No
        </p>
      </Box>
      {/* <Button onClick={handleDownloadPDF} color="primary" variant="contained">
        Download as PDF
      </Button> */}
    </Container>
  );
};

export default Content;
