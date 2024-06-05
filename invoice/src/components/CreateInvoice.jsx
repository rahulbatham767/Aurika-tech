import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  Box,
  Container,
  Input,
  Stack,
  TextField,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [form, setForm] = useState({
    sellerDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      panNo: "",
      gstNo: "",
      placeOfSupply: "",
    },
    billingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateCode: "",
    },
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateCode: "",
    },
    orderDetails: { orderNo: "", orderDate: "" },
    invoiceDetails: { invoiceNo: "", invoiceDate: "" },
    reverseCharge: false,
    items: [
      {
        description: "",
        unitPrice: 0,
        quantity: 0,
        discount: 0,
        netAmount: 0,
        taxRate: 18,
        taxAmount: 0,
        totalAmount: 0,
      },
    ],
    signatureImage: "",
    companyLogo: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    if (section && field) {
      setForm((prevForm) => ({
        ...prevForm,
        [section]: {
          ...prevForm[section],
          [field]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...form.items];
    items[index][name] = value;
    items[index].netAmount =
      items[index].unitPrice * items[index].quantity - items[index].discount;
    items[index].taxAmount =
      items[index].netAmount * (items[index].taxRate / 100);
    items[index].totalAmount = items[index].netAmount + items[index].taxAmount;
    setForm({ ...form, items });
  };

  const addItem = () => {
    setForm((prevForm) => ({
      ...prevForm,
      items: [
        ...prevForm.items,
        {
          description: "",
          unitPrice: 0,
          quantity: 0,
          discount: 0,
          netAmount: 0,
          taxRate: 18,
          taxAmount: 0,
          totalAmount: 0,
        },
      ],
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: reader.result,
      }));
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = (e) => {
    if (localStorage.getItem("saveData")) {
      localStorage.removeItem("saveData");
    }
    e.preventDefault();

    console.log(form);
    localStorage.setItem("saveData", JSON.stringify(form));
    navigate("/invoice-show");
  };

  const deleteData = (index) => {
    const updatedItems = [...form.items];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setForm({ ...form, items: updatedItems });
  };

  return (
    <Container className="shadow-md rounded-md p-3">
      <Typography variant="h4" gutterBottom>
        INVOICE
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={"row"} spacing={4}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Seller Details
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="sellerDetails.name"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="sellerDetails.address"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="sellerDetails.city"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="State"
              name="sellerDetails.state"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pincode"
              name="sellerDetails.pincode"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="PAN No."
              name="sellerDetails.panNo"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="GST Registration No."
              name="sellerDetails.gstNo"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Place of Supply"
              name="sellerDetails.placeOfSupply"
              onChange={handleInputChange}
              margin="normal"
            />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Company Logo
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
              name="companyLogo"
              fullWidth
            />
            <Box mt={2}>
              {form.companyLogo && (
                <img
                  src={form.companyLogo}
                  alt="Company Logo"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              )}
            </Box>
            <Typography variant="h6" gutterBottom mt={4}>
              Signature Image
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
              name="signatureImage"
              fullWidth
            />
            <Box mt={2}>
              {form.signatureImage && (
                <img
                  src={form.signatureImage}
                  alt="Signature"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              )}
            </Box>
          </Box>
        </Stack>
        {/* Billing details */}
        <Stack direction={"row"} spacing={4}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Billing Details
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="billingDetails.name"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="billingDetails.address"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="billingDetails.city"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="State"
              name="billingDetails.state"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pincode"
              name="billingDetails.pincode"
              onChange={handleInputChange}
              margin="normal"
            />
          </Box>
          <Box flex={1}></Box>
        </Stack>

        {/* Shipping  details */}
        <Stack direction={"row"} spacing={4}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Shipping Details
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="shippingDetails.name"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="shippingDetails.address"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="shippingDetails.city"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="State"
              name="shippingDetails.state"
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pincode"
              name="shippingDetails.pincode"
              onChange={handleInputChange}
              margin="normal"
            />
          </Box>
          <Box flex={1}></Box>
        </Stack>
        {/* Order Details */}
        <Box m={4}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <TextField
            fullWidth
            label="Order No."
            name="orderDetails.orderNo"
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Order Date"
            type="date"
            name="orderDetails.orderDate"
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        {/* Invoice Details */}
        <Box m={4}>
          <Typography variant="h6" gutterBottom>
            Invoice Details
          </Typography>
          <TextField
            fullWidth
            label="Invoice No."
            name="invoiceDetails.invoiceNo"
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Invoice Date"
            type="date"
            name="invoiceDetails.invoiceDate"
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        {/* Reverse Charge */}
        <Box m={4}>
          <Typography variant="h6" gutterBottom>
            Reverse Charge
          </Typography>
          <select
            id="reverseCharge"
            name="reverseCharge"
            value={form.reverseCharge}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                reverseCharge: e.target.value === "true",
              }))
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </Box>

        <Box m={4}>
          <Typography variant="h6" gutterBottom>
            Items
          </Typography>
          <Button variant="contained" color="primary" onClick={addItem}>
            Add Item
          </Button>
          <TableContainer component={Paper} mt={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Net Amount</TableCell>
                  <TableCell>Tax Rate</TableCell>
                  <TableCell>Tax Amount</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        name="description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="unitPrice"
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="discount"
                        type="number"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="netAmount"
                        type="number"
                        value={item.netAmount}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="taxRate"
                        type="number"
                        value={item.taxRate}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="taxAmount"
                        type="number"
                        value={item.taxAmount}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="totalAmount"
                        type="number"
                        value={item.totalAmount}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteData(index)}>
                        <MdDelete className="text-3xl" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Button variant="contained" color="primary" type="submit" mt={4}>
          Create Invoice
        </Button>
      </form>
    </Container>
  );
};

export default CreateInvoice;
