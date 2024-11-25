import React, { useState } from 'react';

function Reserve() {
  const [slotId, setSlotId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleReserve = async () => {
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
        },
        body: JSON.stringify({ parkingSlotId: slotId, startTime, endTime }),
      });

      if (!response.ok) {
        throw new Error('Reservation failed');
      }

      const data = await response.json();
      alert('Reservation successful');
    } catch (error) {
      console.error('Error reserving slot:', error.message);
      alert('Failed to reserve slot. Please try again.');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Reserve Parking Slot</h1>
      <input
        type="text"
        placeholder="Slot ID"
        value={slotId}
        onChange={(e) => setSlotId(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="button" onClick={handleReserve}>
        Reserve
      </button>
    </form>
  );
}

export default Reserve;
