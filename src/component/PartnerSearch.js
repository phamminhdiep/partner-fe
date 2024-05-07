import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/PartnerSearch.css';
import Navbar from './Navbar';

function PartnerSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [partners, setPartners] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/partner/get-by-name', {
                params: {
                    name: searchQuery
                }
            });
            setPartners(response.data);
        }
        catch (error) {
            console.error('Error fetching partners:', error);
        }
    };

    return (
        <div className="partner-search-container">
            <Navbar></Navbar>
            <h1>Tìm kiếm Đối tác</h1>
            <div className="search-input">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Enter search query..."
                />
                <button onClick={handleSearchSubmit}>Search</button>
            </div>
            <div className="search-results">
                <h2>Kết quả</h2>
                <table className="partner-search-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Location</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partners.map(partner => (
                            <tr key={partner.id}>
                                <td>{partner.name}</td>
                                <td>{partner.code}</td>
                                <td>{partner.location}</td>
                                <td>{partner.phoneNumber}</td>
                                <td>
                                    <div className='partner-list-button'>
                                        <button>
                                            <Link className='editButton' to={`/service-usage-by-partner/${partner.id}`}>Pay Service Fee</Link>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PartnerSearch;
