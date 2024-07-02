// components/PdfViewComponent.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const PdfDocument = ({ formData, maatraCount }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.section}>
        <Text>Title: {formData.title}</Text>
      </View>
      <View style={styles.section}>
        <Text>Thalam: {formData.thalam}</Text>
      </View>
      <View style={styles.section}>
        <Text>Nadai: {formData.nadai}</Text>
      </View>
      <View style={styles.section}>
        <Text>Maatras: {maatraCount}</Text>
      </View>
      {formData.avarthanams.map((avarthanam, index) => (
        <View key={index} style={styles.section}>
          <Text>Avarthanam {index + 1}: {avarthanam}</Text>
        </View>
      ))}
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
  const { formData, maatraCount } = location.state;

  return (
    <div>
      <h1>PDF Preview</h1>
      <PDFDownloadLink document={<PdfDocument formData={formData} maatraCount={maatraCount} />} fileName="form_data.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
      <PdfDocument formData={formData} maatraCount={maatraCount} />
    </div>
  );
};

export default PdfViewComponent;
