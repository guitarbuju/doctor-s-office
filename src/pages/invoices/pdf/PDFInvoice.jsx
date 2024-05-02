import { useState, useEffect } from "react";
import { getDniData } from "../../../api/fetchData";
import { arrangeData } from "../../../api/groupedData.js";
import { formatDate } from "../../../api/formatDate.js";
import { Page, Document, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./styles.js";
import hospital from "../../../assets/Hopital_Varsovie-hd.jpg";

const PDFInvoice = ({ getInvoiceId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/invoices/getOne`;
  const [selectedInvoice, setSelectedInvoice] = useState([]);

  const getOneInvoice = async () => {
    const response = await getDniData(url, getInvoiceId);
    const dataToArrange = arrangeData(response.data);
    setSelectedInvoice(dataToArrange);
  };

  useEffect(() => {
    getOneInvoice();
  }, [getInvoiceId]);



  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Text style={styles.title}>Medical Services Invoice</Text>
        <View style={styles.infoWrapper}>
          <View>
            <Text>Patient: {selectedInvoice[0]?.patient_full_name}</Text>
            <Text>Invoice Number: {selectedInvoice[0]?.invoice_id}</Text>
            <Text>
              Invoice Date: {formatDate(selectedInvoice[0]?.invoice_date)}
            </Text>
            <Text>Doctor: {selectedInvoice[0]?.doctor_full_name}</Text>
            <Text>Admission Id: {selectedInvoice[0]?.admission_id}</Text>
          </View>

          <Image style={{ width: "100px" }} src={hospital} />
        </View>
        <Text style={styles.titleContainer}>Invoice Items</Text>
        <View>
          <View style={styles.headers}>
            <Text>Charge Date</Text>
            <Text>Charge Title</Text>
            <Text>Price</Text>
            <Text>Units</Text>
            <Text>Total</Text>
          </View>

          <View>
            {selectedInvoice[0]?.charges.map((charge, index) => (
              <View key={index} style={styles.trows}>
                <Text style={styles.td}>{formatDate(charge.charge_date)}</Text>
                <Text style={styles.chargeTitle}>{charge.title}</Text>
                <Text style={styles.td}>{charge.price}</Text>
                <Text style={styles.td}>{charge.amount}</Text>
                <Text style={styles.td}>{charge.total}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.total}>
          Total: {selectedInvoice[0]?.invoice_total}
        </Text>
      </Page>
    </Document>
  );
};

export default PDFInvoice;
