import  { useState, useEffect } from "react";
import { getDniData } from "../../../api/fetchData";
import { Page, Document, View, Text } from "@react-pdf/renderer";
import { styles } from "./pdfStyles.js";
import { formatDate } from "../../../api/formatDate.js";

const PdfMedicalChart = ({ admissionId , patient }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const url = `${BASE_URL}/medicalcharts/recipe`;
  const [selectedChart, setSelectedChart] = useState([]);

  const admissionInfoId = admissionId;
  const patientName = patient;
  console.log(admissionId);

  const getOneIdChart = async () => {
    const retrievedChart = await getDniData(url, admissionInfoId);
    setSelectedChart(retrievedChart);
  };

  useEffect(() => {
    getOneIdChart();
  }, [admissionInfoId]);

  console.log(selectedChart);

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Text style={styles.title}>Dr. Orders</Text>
        <View style={styles.headers}>
          <Text>Date: {formatDate(selectedChart?.data?.data[0]?.date_created)}</Text>
          <Text>Admission: {admissionInfoId}</Text>
          <Text>Patient: {patientName}</Text>
        </View>
        <View style={styles.descriptionWrapper}>
          <View style={styles.description}>
            <Text style={styles.title}>Description:</Text>
            <Text>{selectedChart?.data?.data[0]?.medical_entry}</Text>
          </View>
        </View>
        <Text style={styles.description}>Medical Recipe</Text>
        <View style={styles.titleWrapper}>
              <Text style={styles.orderColumn}>Medicine</Text>
              <Text style={styles.orderColumn}>Dosis</Text>
              <Text style={styles.orderColumn}>Orders</Text>

        </View>
        <View>
          {selectedChart?.data?.data?.map((order, index) => (
            <View key={index} style={styles.ordersWrapper}>
              <Text style={styles.orderColumn}>{order.medicine_title}</Text>
              <Text style={styles.orderColumn}>{order.dosis}</Text>
              <Text style={styles.orderColumn}>{order.orders}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PdfMedicalChart;
