import React, { useState, useEffect } from 'react';
import SlotForm from './SlotForm';
import SlotList from './SlotList';
import API from '../api';
import '../Styles/ParkingSpace.css'; // Import the CSS

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/slots');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error.message);
      alert('Failed to fetch slots. Please try again later.');
    }
  };
  
  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div className="manage-slots">
      <h2>Manage Parking Slots</h2>
      <SlotForm refreshSlots={fetchSlots} />
      <SlotList slots={slots} refreshSlots={fetchSlots} />
    </div>
  );
};

export default ManageSlots;
