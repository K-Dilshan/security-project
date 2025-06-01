import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './GRNform.css'; 
import axios from 'axios';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

export default function GRNform() {
  const [grnData, setgrnData] = useState({
    itemCode: '',
    itemName: '',
    vendorName: '',
    vendorCode: '',
    quantity: '',
    uom: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setgrnData({
      ...grnData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const grnNumber = 'GRN-' + Date.now();

     const updatedgrnData = {
      ...grnData,
      grnNumber,
      selectedDate: new Date(),
    };
    
    console.log('Submitting GRN Data:', updatedgrnData);
    try {
      const response = await axios.post('http://localhost:5000/api/grn/add', updatedgrnData);
      console.log(response.data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form', error.response ? error.response.data : error.message);
      alert('Error submitting the form');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Goods Receive Note</h2>

      <form onSubmit={handleSubmit} className="form">
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput
              id='form6Example1'
              label='Item Code'
              name='itemCode'
              placeholder='Item Code'
              value={grnData.itemCode}
              onChange={handleChange}
              required
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput
              id='form6Example2'
              label='Item Name'
              name='itemName'
              placeholder='Item Name'
              value={grnData.itemName}
              onChange={handleChange}
              required
            />
          </MDBCol>
        </MDBRow>

        <MDBInput
          wrapperClass='mb-4'
          id='form6Example4'
          label='Vendor Code'
          name='vendorCode'
          placeholder='Vendor Code'
          value={grnData.vendorCode}
          onChange={handleChange}
          required
        />
        <MDBInput
          wrapperClass='mb-4'
          id='form6Example3'
          label='Vendor Name'
          name='vendorName'
          placeholder='Vendor Name'
          value={grnData.vendorName}
          onChange={handleChange}
          required
        />

        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput
              id='form6Example5'
              label='Quantity'
              name='quantity'
              placeholder='Quantity'
              value={grnData.quantity}
              onChange={handleChange}
              required
            />
          </MDBCol>
          <MDBCol>
            <select
              className='form-select'
              name='uom'
              value={grnData.uom}
              onChange={handleChange}
              required
            >
              <option value="">Select UOM</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="Nos">Nos</option>
              <option value="L">L</option>
            </select>
          </MDBCol>
        </MDBRow>
        <MDBInput
          wrapperClass='mb-4'
          id='form6Example7'
          label='Remarks'
          name='remarks'
          placeholder='Remarks'
          value={grnData.remarks}
          onChange={handleChange}
        />

        <div className="center-button">
          <MDBBtn className='mb-4' type='submit' block>
            Submit
          </MDBBtn>
        </div>
      </form>
    </div>
  );
}
