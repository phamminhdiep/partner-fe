import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import '../css/ServiceUsingRegistration.css';
function ServiceUsingRegistration() {
  const [partnersOption, setPartnersOption] = useState([]);
  const [servicesOption, setServicesOption] = useState([]);
  const [selectedPartnersOption, setSelectedPartnersOption] = useState('');
  const [selectedServicesOption, setSelectedServicesOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API để lấy dữ liệu cho dropdown list 1
    axios.get('http://localhost:8080/api/v1/partner/get-all')
      .then(response => {
        setPartnersOption(response.data);
      })
      .catch(error => {
        console.error('Error fetching options1:', error);
      });

    // Gọi API để lấy dữ liệu cho dropdown list 2
    axios.get('http://localhost:8080/api/v1/services/get-all')
      .then(response => {
        setServicesOption(response.data);
      })
      .catch(error => {
        console.error('Error fetching options2:', error);
      });
  }, []);

  useEffect(() => {
    if (partnersOption.length > 0) {
      setSelectedPartnersOption(partnersOption[0].id);
    }
  }, [partnersOption]);

  useEffect(() => {
    if (servicesOption.length > 0) {
      setSelectedServicesOption(servicesOption[0].id);
    }
  }, [servicesOption]);

  const handlePartnerOptionChange = (event) => {
    setSelectedPartnersOption(event.target.value);
  };

  const handleServiceOptionChange = (event) => {
    setSelectedServicesOption(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceUsage = {
        partnerId: selectedPartnersOption,
        serviceId: selectedServicesOption,
        date: selectedDate,
        amount: amount
      }
      console.log("serviceUsage ",serviceUsage);

      await axios.post('http://localhost:8080/api/v1/service-usage', serviceUsage);

      navigate('/partner/list');
    } catch (error) {
      console.error('Error adding partner:', error);
    }
    console.log("Submitted");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="service-use-container">
        <h1 className='service-use-h1'>Service Usage Registration</h1>
        <div>
          <label className='service-use-label' htmlFor="partnerDropdown">Partner:</label>
          <select className='service-use-select' id="partnerDropdown" value={selectedPartnersOption} onChange={handlePartnerOptionChange}>
           {partnersOption.map((partner) => (
              <option key={partner.id} value={partner.id}>{partner.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label  className='service-use-label' htmlFor="serviceDropdown">Service:</label>
          <select className='service-use-select' id="serviceDropdown" value={selectedServicesOption} onChange={handleServiceOptionChange}>
            {servicesOption.map((service) => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label  className='service-use-label' htmlFor="datePicker">Date:</label>
          <input className='service-use-input' type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div>
          <label  className='service-use-label' htmlFor="amountInput">Amount:</label>
          <input className='service-use-input' type="number" id="amountInput" value={amount} onChange={handleAmountChange} />
        </div>
        <button className='service-use-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default ServiceUsingRegistration;
