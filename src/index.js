import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function Form() {
  const [inputFields, setInputFields] = useState([
    { name: '', age: '' }
  ])
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields)
}
  return (
    <div className="Form">
      <form>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Name'
                value={input.name}
                onChange={event => handleFormChange(index, event)}
              />
              <input
                name='age'
                placeholder='Age'
                value={input.age}
                onChange={event => handleFormChange(index, event)}
              />
            </div>
          )
        })}
      </form>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  section: {
    margin: 10,
    padding: 10
    // flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
const App = () => (
  <div>
    <Form/>
    <PDFViewer>
      <MyDocument/>
      </PDFViewer>
    <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download!'
      }
    </PDFDownloadLink>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));