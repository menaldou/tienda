import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Modulos from './views/Modulos';
import Productos from './views/Productos';
import Ventas from './views/Ventas';
import Proveedores from './views/Proveedores';
import Usuarios from './views/Usuarios';
import './css/App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <BrowserRouter>
      <Routes>    
        <Route path='/' element={<Login />} />
        <Route path='/Modulos' element={<Modulos />} />
        <Route exac path='/Modulos/Productos' element={<Productos />} /> 
        <Route exac path='/Modulos/Ventas' element={<Ventas />} /> 
        <Route exac path='/Modulos/Proveedores' element={<Proveedores />} /> 
        <Route exac path='/Modulos/Usuarios' element={<Usuarios />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
