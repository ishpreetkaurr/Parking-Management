import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Footer from './Components/Footer';
import ParkingSpace from './Components/ParkingSpace';
import Reservation from './Components/Reservation';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/parking" element={<ParkingSpace />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />{/* Default Route */}
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
