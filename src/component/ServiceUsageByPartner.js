import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/ServiceUsageByPartner.css';
import Navbar from './Navbar';

function ServiceUsageByPartner() {
    const [dataList, setDataList] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [paidService, setPaidService] = useState([]); 
    const [invoice, setInvoice] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchServiceUsageByPartner();
    }, [id]);

    useEffect(() => {
        fetchPaidServiceUsage();
    }, [invoice]);

    

    const fetchServiceUsageByPartner = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/service-usage/get-by-partner-id', {
                params: {
                    partnerId: id
                }
            });
            setDataList(response.data);
            console.log("Data list:", dataList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchPaidServiceUsage = async () => {
        console.log("Invoice:", invoice.id);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/service-usage/get-by-invoice-id', {
                params: {
                    invoiceId: invoice.id
                }
            });
            setPaidService(response.data);
            console.log("Paid service:", paidService);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCheckboxChange = (event, serviceId) => {
        if (event.target.checked) {
            setSelectedServices(prevServices => [...prevServices, serviceId]);
        } else {
            setSelectedServices(prevServices => prevServices.filter(id => id !== serviceId));
        }
        console.log('Selected services:', selectedServices);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/invoice/generate-invoice?partnerId=${id}`,
                selectedServices,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setInvoice(response.data); 
        } catch (error) {
            console.error('Error generating invoice:', error);
        }
        console.log('Selected services:', selectedServices);
    };

    return (
        <div className="service-usage-container">
            <Navbar />
            <h1 className="service-usage-page-title">Danh sách dịch vụ chưa thanh toán</h1>
            <table className="service-usage-data-table">
                <thead>
                    <tr>
                        <th className="service-usage-table-header">Name</th>
                        <th className="service-usage-table-header">Date</th>
                        <th className="service-usage-table-header">Description</th>
                        <th className="service-usage-table-header">Total</th>
                        <th className="service-usage-table-header">Amount</th>
                        <th className="service-usage-table-header">Price</th>
                        <th className="service-usage-table-header">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((data, index) => (
                        <tr key={index}>
                            <td className="service-usage-table-cell">{data.name}</td>
                            <td className="service-usage-table-cell">{new Date(data.date).toLocaleDateString()}</td>
                            <td className="service-usage-table-cell">{data.description}</td>
                            <td className="service-usage-table-cell">{data.total}</td>
                            <td className="service-usage-table-cell">{data.amount}</td>
                            <td className="service-usage-table-cell">{data.price}</td>
                            <td className="service-usage-table-cell">
                                <input
                                    type="checkbox"
                                    checked={selectedServices.includes(data.id)}
                                    onChange={(event) => handleCheckboxChange(event, data.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='service-used-button-container'>
                <button className='service-used-button' onClick={handleSubmit}>Thanh toán</button>
                <button className='service-used-button' onClick={() => navigate('/partner/list')}>Hủy</button>
            </div>

            {invoice.id && 
            <div>
                 <h2>Tổng chi phí: {invoice.total}</h2>
                 <table className="service-usage-data-table">
                <thead>
                    <tr>
                        <th className="service-usage-table-header">Name</th>
                        <th className="service-usage-table-header">Date</th>
                        <th className="service-usage-table-header">Description</th>
                        <th className="service-usage-table-header">Total</th>
                        <th className="service-usage-table-header">Amount</th>
                        <th className="service-usage-table-header">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {paidService.map((data, index) => (
                        <tr key={index}>
                            <td className="service-usage-table-cell">{data.name}</td>
                            <td className="service-usage-table-cell">{new Date(data.date).toLocaleDateString()}</td>
                            <td className="service-usage-table-cell">{data.description}</td>
                            <td className="service-usage-table-cell">{data.total}</td>
                            <td className="service-usage-table-cell">{data.amount}</td>
                            <td className="service-usage-table-cell">{data.price}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            }
        </div>
    );
}

export default ServiceUsageByPartner;
