import { useNavigate } from 'react-router-dom'
import '../css/Modulo.css';

function Modulo({ Component, nombre, nav }){
    
    const navigate = useNavigate();
    
    return(
        <div>
            <button className='shadow-boton' onClick={() => navigate(nav)}>
                {/*se define las imagenes para que carguen en el menu de los modulos*/}
                <Component style={{ fontSize: '10rem' }} />
                {/*se define los nombres para describir cada uno de los botones*/}
                <h3>{nombre}</h3>
            </button>
        </div>
    );   
}

export default Modulo;