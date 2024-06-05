// PDFDocument.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

const PDFDocument = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Sold By:</Text>
        <Text style={styles.text}>{invoiceData.sellerDetails.name}</Text>
        <Text style={styles.text}>{invoiceData.sellerDetails.address}</Text>
        <Text style={styles.text}>{invoiceData.sellerDetails.city}</Text>
        <Text style={styles.text}>{invoiceData.sellerDetails.state}</Text>
        <Text style={styles.text}>{invoiceData.sellerDetails.pincode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Billing Address:</Text>
        <Text style={styles.text}>{invoiceData.billingDetails.name}</Text>
        <Text style={styles.text}>{invoiceData.billingDetails.address}</Text>
        <Text style={styles.text}>{invoiceData.billingDetails.city}</Text>
        <Text style={styles.text}>{invoiceData.billingDetails.state}</Text>
        <Text style={styles.text}>{invoiceData.billingDetails.pincode}</Text>
        <Text style={styles.text}>
          State/UT Code: {invoiceData.billingDetails.stateCode}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Shipping Address:</Text>
        <Text style={styles.text}>{invoiceData.shippingDetails.name}</Text>
        <Text style={styles.text}>{invoiceData.shippingDetails.address}</Text>
        <Text style={styles.text}>{invoiceData.shippingDetails.city}</Text>
        <Text style={styles.text}>{invoiceData.shippingDetails.state}</Text>
        <Text style={styles.text}>{invoiceData.shippingDetails.pincode}</Text>
        <Text style={styles.text}>
          State/UT Code: {invoiceData.shippingDetails.stateCode}
        </Text>
        <Text style={styles.text}>
          Place of supply: {invoiceData.sellerDetails.placeOfSupply}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Order Details:</Text>
        <Text style={styles.text}>
          Order Number: {invoiceData.orderDetails.orderNo}
        </Text>
        <Text style={styles.text}>
          Order Date: {invoiceData.orderDetails.orderDate}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Invoice Details:</Text>
        <Text style={styles.text}>
          Invoice Number: {invoiceData.invoiceDetails.invoiceNo}
        </Text>
        <Text style={styles.text}>
          Invoice Date: {invoiceData.invoiceDetails.invoiceDate}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Items:</Text>
        {invoiceData.items.map((item, index) => (
          <View key={index} style={styles.text}>
            <Text>
              {index + 1}. {item.description}
            </Text>
            <Text>Unit: {item.unit}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Net Amount: {item.netAmount}</Text>
            <Text>Tax Rate: {item.taxRate}</Text>
            <Text>Tax Type: {item.taxType}</Text>
            <Text>Tax Amount: {item.taxAmount}</Text>
            <Text>Total Amount: {item.totalAmount}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
