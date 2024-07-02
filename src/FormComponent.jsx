// components/FormComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    thalam: '',
    nadai: '',
    avarthanams: [''],
  });
  const [maatraCount, setMaatraCount] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'thalam' || name === 'nadai') {
      const thalamValue = name === 'thalam' ? parseInt(value, 10) : parseInt(formData.thalam, 10);
      const nadaiValue = name === 'nadai' ? parseInt(value, 10) : parseInt(formData.nadai, 10);
      if (!isNaN(thalamValue) && !isNaN(nadaiValue)) {
        setMaatraCount(thalamValue * nadaiValue);
      }
    }
  };

  const handleAvarthanamChange = (index, value) => {
    const newAvarthanams = [...formData.avarthanams];
    newAvarthanams[index] = value;
    setFormData({ ...formData, avarthanams: newAvarthanams });
  };

  const addAvarthanam = () => {
    setFormData({ ...formData, avarthanams: [...formData.avarthanams, ''] });
  };

  const removeAvarthanam = (index) => {
    const newAvarthanams = formData.avarthanams.filter((_, i) => i !== index);
    setFormData({ ...formData, avarthanams: newAvarthanams });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/pdf-view', { state: { formData, maatraCount } });
  };

  const handleReset = () => {
    setFormData({
      title: '',
      thalam: '',
      nadai: '',
      avarthanams: [''],
    });
    setMaatraCount(0);
  };

  return (
    <div className="container">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Thalam:</label>
          <input type="number" name="thalam" value={formData.thalam} onChange={handleChange} required />
        </div>
        <div>
          <label>Nadai:</label>
          <input type="number" name="nadai" value={formData.nadai} onChange={handleChange} required />
        </div>
        {maatraCount > 0 && formData.thalam && formData.nadai && (
          <>
            {formData.avarthanams.map((avarthanam, index) => (
              <div className="avarthanam-container" key={index}>
                <div style={{ flexGrow: 1 }}>
                  <label>Avarthanam {index + 1}:</label>
                  <input
                    type="text"
                    value={avarthanam}
                    onChange={(e) => handleAvarthanamChange(index, e.target.value)}
                    maxLength={maatraCount}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeAvarthanam(index)}
                >
                  🗑️
                </button>
              </div>
            ))}
            <button type="button" onClick={addAvarthanam}>Add Avarthanam</button>
          </>
        )}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} style={{ marginTop: '10px' }}>Reset</button>
      </form>
    </div>
  );
};

export default FormComponent;
