// components/PdfViewComponent.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';

const PdfDocument = ({ formData }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.section}>
        <Text>Name: {formData.name}</Text>
      </View>
      <View style={styles.section}>
        <Text>Age: {formData.age}</Text>
      </View>
      <View style={styles.section}>
        <Text>Occupation: {formData.occupation}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 14,
  },
});

const PdfViewComponent = () => {
  const location = useLocation();
  const { formData } = location.state;

  return (
    <div>
      <h1>PDF Preview</h1>
      <PDFDownloadLink document={<PdfDocument formData={formData} />} fileName="form_data.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
      <PdfDocument formData={formData} />
    </div>
  );
};

export default PdfViewComponent;
