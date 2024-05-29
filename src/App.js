import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RequiresAuth from './pages/Auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>} />
      <Route path='/register' element={<Register />}/>
      <Route path='/dashboard' element={<RequiresAuth><Dashboard /></RequiresAuth>} />
      <Route path='/profile' element={<RequiresAuth><ProfilePage /></RequiresAuth>} />
    </Routes>
  );
}

export default App;
