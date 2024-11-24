import React, { useState } from 'react';

const SlotForm = ({ refreshSlots }) => {
  const [slotNumber, setSlotNumber] = useState('');
  const [size, setSize] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slotNumber, size }),
      });
      if (!response.ok) {
        throw new Error('Failed to create slot');
      }
      const newSlot = await response.json();
      console.log('New slot added:', newSlot);
      refreshSlots((prevSlots) => [...prevSlots, newSlot]); // Update slots locally
      setSlotNumber('');
      setSize('medium');
    } catch (error) {
      console.error('Error creating slot:', error.message);
      alert('Failed to create slot. Please try again.');
    }
  };

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Slot Number"
        value={slotNumber}
        onChange={(e) => setSlotNumber(e.target.value)}
        required
      />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button type="submit">Add Slot</button>
    </form>
  );
};

export default SlotForm;
