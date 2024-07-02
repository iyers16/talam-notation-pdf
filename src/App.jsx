// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormComponent from './FormComponent';
import PdfViewComponent from './PdfViewComponent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormComponent />} />
      <Route path="/pdf-view" element={<PdfViewComponent />} />
    </Routes>
  );
};

export default App;
