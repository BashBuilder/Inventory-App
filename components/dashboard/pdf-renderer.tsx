// components/pdf/ReceiptPDF.tsx

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register a font (optional)
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v6/q7d-lm.pdf",
      fontWeight: "normal",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  total: {
    borderTop: "1pt solid black",
    marginTop: 12,
    paddingTop: 6,
    fontWeight: "bold",
  },
});

interface Props {
  sale: SalesType;
}

const ReceiptPDF: React.FC<Props> = ({ sale }) => {
  const total = (sale.quantity ?? 0) * (sale.price ?? 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Receipt</Text>

        <View style={styles.row}>
          <Text>Product:</Text>
          <Text>{sale.name}</Text>
        </View>

        <View style={styles.row}>
          <Text>Quantity:</Text>
          <Text>{sale.quantity}</Text>
        </View>

        <View style={styles.row}>
          <Text>Price:</Text>
          <Text>₦{sale.price?.toLocaleString()}</Text>
        </View>

        <View style={[styles.row, styles.total]}>
          <Text>Total:</Text>
          <Text>₦{total.toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPDF;
