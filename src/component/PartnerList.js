import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/PartnerList.css'; // Import CSS file
import Navbar from './Navbar';

function PartnerList() {
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/partner', {
        params: {
          page: currentPage,
          size: pageSize
        }
      });
      setPartners(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this partner?');
      if (!confirmed) {
        return;
      }
      
      await axios.delete(`http://localhost:8080/api/v1/partner`, {
        params: {
          id: id
        }
      });
      fetchData();
      const updatedPartner = partners.filter((p) => p.id !== id);
      setPartners(updatedPartner);
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  return (
    <div className='container'>
      <Navbar></Navbar>
      <div className="partner-list-container">
      <h1>Partner List</h1>
      <button className='add-partner-button'>
        <Link to="/partner/add">Add Partner</Link>
      </button>
      
      <table className="partner-table">
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
                    <Link className='editButton' to={`/partner/edit/${partner.id}`}>Edit</Link>
                  </button>
                  <button onClick={() => handleDelete(partner.id)}>Delete</button>
                </div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
    </div>

    
  );
}

export default PartnerList;
