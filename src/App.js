import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from './Components/Error/Error';
import Users from './Components/Users/Users';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';
import Baneo from './Components/Ban/Ban';
import Bienvenida from './Components/Bienvenida/bienvenida';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Editar from './Components/Editar/Editar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/ban" element={<PrivateRoute><Baneo /></PrivateRoute>} />
        <Route path="/edit" element={<PrivateRoute><Editar /></PrivateRoute>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;