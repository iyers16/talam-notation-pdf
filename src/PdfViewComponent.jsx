// components/PdfViewComponent.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const PdfDocument = ({ formData, maatraCount }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.section}>
        <Text>Title: {formData.title}</Text>
      </View>
      <br/>
      <View style={styles.section}>
        <Text>Thalam: {formData.thalam}</Text>
      </View>
      <br/>
      <View style={styles.section}>
        <Text>Nadai: {formData.nadai}</Text>
      </View>
      <br/>
      <View style={styles.section}>
        <Text>Maatras: {maatraCount}</Text>
      </View>
      <br/>
      {formData.avarthanams.map((avarthanam, index) => (
        <View key={index} style={styles.section}>
          <Text>Avarthanam {index + 1}: {avarthanam}</Text>
          <br/>
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
    fontSize: 20,
  },
});

const PdfViewComponent = () => {
  const location = useLocation();
  const { formData, maatraCount } = location.state;

  return (
    <div className="pdf-preview">
      <h1>PDF Preview</h1>
      <PDFDownloadLink
        document={<PdfDocument formData={formData} maatraCount={maatraCount} />}
        fileName="generated-talam-notation.pdf"
        className="download-button"
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>

      <PdfDocument formData={formData} maatraCount={maatraCount} />
      <PDFViewer>
        <PdfDocument formData={formData} maatraCount={maatraCount} />
      </PDFViewer>
    </div>
  );
};

export default PdfViewComponent;
