import Cookies from 'universal-cookie';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import '../css/Header.css';

const cookies = new Cookies();

function Header(){
    return(
        <div>
            <div className="flex-centro">
                {/*se define el titulo*/}
                <h1>Tienda</h1>
                {/*insertamos el logo*/}
                <StoreMallDirectoryIcon style={{ fontSize: '12rem'}} />
                <h1>Virtual</h1>
            </div>
            <div className='contenedor-nombre'>
                {/*se muestra el nombre de usuario*/}
                <h3>Usuario: {cookies.get('nombre')} {cookies.get('apellido')}</h3>
            </div>
            <div className='barra' >
                Busca
                <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                </div>
            
        </div>
    );
}

export default Header;