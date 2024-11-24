import React, { useState, useEffect } from 'react';

const SlotList = () => {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/slots');
      if (!response.ok) {
        throw new Error('Failed to fetch slots');
      }
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error.message);
      alert('Failed to fetch slots.');
    }
  };

  const deleteSlot = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/slots/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete slot');
      }
      setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id)); // Update UI directly
    } catch (error) {
      console.error('Error deleting slot:', error.message);
      alert('Failed to delete slot.');
    }
  };

  useEffect(() => {
    fetchSlots(); // Fetch slots on component mount
  }, []);

  return (
    <div className="slot-list">
      <h3>Parking Slots</h3>
      {slots.length > 0 ? (
        <ul>
          {slots.map((slot) => (
            <li key={slot._id}>
              Slot {slot.slotNumber} ({slot.size})
              <button onClick={() => deleteSlot(slot._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No slots available.</p>
      )}
    </div>
  );
};

export default SlotList;
