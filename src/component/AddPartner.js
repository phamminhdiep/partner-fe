import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddPartner.css'; // Import CSS file
import { useNavigate } from 'react-router';
import Navbar from './Navbar';

function AddPartner() {
  const [partner, setPartner] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("partner ", partner);
        await axios.post('http://localhost:8080/api/v1/partner', partner);
        navigate('/partner/list');
    } catch (error) {
        console.log('Error:', error.response.data.message);
        alert('Error adding partner: ' + error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setPartner(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div className="add-partner-container">
      <Navbar></Navbar>
      <h1>Add Partner</h1>
      <form className="add-partner-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" name="code" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange} />
        </div>
        <div className='button-container'>
          <button type="submit">Add Partner</button>
          <button type="reset">Reset</button>
          <button onClick={() => navigate('/partner/list')}>Cancel</button>
        </div>
        
      </form>
    </div>
  );
}

export default AddPartner;
