import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import '../css/EditPartner.css'; // Import CSS file
import { useNavigate } from 'react-router';

function EditPartner() {
  const { id } = useParams();
  console.log("id ",id);
  const [partner, setPartner] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPartner();
}, [id]);

const fetchPartner = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/partner/get-by-id`,{
            params: {
                id: id
            }
        });
        setPartner(response.data);
    } catch (error) {
        console.error('Error fetching', error);
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("partner ",partner);
      await axios.put(`http://localhost:8080/api/v1/partner?id=${id}`, partner);
      navigate('/partner/list');
      
    } catch (error) {
      console.error('Error update partner:', error.response.data.message);
      alert('Error update partner: ' + error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setPartner(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    navigate('/partner/list');
  };

  const handleReset = () => {
    fetchPartner();
  };

  return (
    <div className="add-partner-container">
      <h1>Add Partner</h1>
      <form className="add-partner-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={partner.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" name="code" value={partner.code} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={partner.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={partner.phoneNumber} onChange={handleChange} />
        </div>
        <div className='button-container'>
            <button type="submit">Save Partner</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPartner;
