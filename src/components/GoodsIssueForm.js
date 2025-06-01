import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css';
import './GoodsIssueForm.css';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

export default function GoodsIssueForm() {

  const [goodIssue, setGoodIssue] = useState({
    itemCode: '',
    itemName: '',
    customerCode: '',
    customerName: '',
    quantity: '',
    uom: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGoodIssue({
      ...goodIssue,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goodIssueNum = 'GRN-' + Date.now();

     const goodIssueData = {
      ...goodIssue,
      goodIssueNum,
      selectedDate: new Date(), 
    };
    try {
      const response = await axios.post('http://localhost:5000/api/goodissue/add', goodIssueData);
      console.log(response.data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form', error.response ? error.response.data : error.message);
      alert('Error submitting the form');
    }
  };

    return (
      <div className="form-container">
      <h2 className="form-heading">Goods Issue Note</h2>

      <form onSubmit={handleSubmit} className="form">
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput
              id='form6Example1'
              label='Item Code'
              name='itemCode'
              placeholder='Item Code'
              value={goodIssue.itemCode}
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
              value={goodIssue.itemName}
              onChange={handleChange}
              required
            />
          </MDBCol>
        </MDBRow>

        <MDBInput
          wrapperClass='mb-4'
          id='form6Example4'
          label='Customer Code'
          name='customerCode'
          placeholder='Customer Code'
          value={goodIssue.vendorCode}
          onChange={handleChange}
          required
        />
        <MDBInput
          wrapperClass='mb-4'
          id='form6Example3'
          label='Customer Name'
          name='customerName'
          placeholder='Customer Name'
          value={goodIssue.vendorName}
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
              value={goodIssue.quantity}
              onChange={handleChange}
              required
            />
          </MDBCol>
          <MDBCol>
            <select
              className='form-select'
              name='uom'
              value={goodIssue.uom}
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
          value={goodIssue.remarks}
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
