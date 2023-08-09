import { useState } from 'react';
import { useProveedores, useCreateProveedor, useUpdateProveedor, useDeleteProveedor } from '../hooks/proveedoresHook';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Proveedores.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Proveedores(){

    const [ modalNew, setModalNew ] = useState(false);
    const [ modalEdit, setModalEdit ] = useState(false);
    const [ msg1, setMsg1 ] = useState(false);
    const [ msg2, setMsg2 ] = useState(false);
    const [ newSuccess, setNewSuccess ] = useState(false);
    const [ editSuccess, setEditSuccess ] = useState(false);
    const [ error, setError ] = useState({});

    const [ form, setForm ] = useState({ _id: '', empresa: '', descripcion: ''});

    const { data: proveedores, isLoading } = useProveedores();
    const { mutate: crear } = useCreateProveedor();
    const { mutate: editar } = useUpdateProveedor();
    const { mutate: eliminar } = useDeleteProveedor();

    const navigate = useNavigate();

    const abrirModalNew = () => {
        setModalNew(true);
    }

    const cerraModalNew = () => setModalNew(false)

    const abrirModalEdit = (id) => {
        const result = proveedores.filter(proveedor => proveedor._id === id);
        setForm(result[0]);
        setModalEdit(true);

    }

    const cerraModalEdit = () => setModalEdit(false)

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlerNew = () => {
        crear({ ...form}, {

            onSuccess: () => {
                setMsg1(true); 
                setModalNew(false);
                setNewSuccess(true);
                setForm({ _id: '', empresa: '', descripcion: '' })
                setTimeout(() => {
                    setMsg1(false);
                    setNewSuccess(false);
                }, 1500);
            },

            onError: (err) => {
                
                setError(err.response.data.errors);
                setMsg1(true);
                setModalNew(false);
                setNewSuccess(false);
                setTimeout(() => {
                    setMsg1(false);
                }, 3000);
            }
        } )
    }

    const handlerEdit = () => {
        editar({ ...form }, { 
        onSuccess: res  => {
         
            if(res.data.bool){
                setMsg2(true); 
                setModalEdit(false);
                setEditSuccess(true);
                setTimeout(() => {
                setMsg2(false);
                setEditSuccess(false);
                }, 1500);
            }else{
                setMsg2(true);
                setModalEdit(false);
                setEditSuccess(false);
                setTimeout(() => {
                setMsg2(false);
                }, 2000);
            }   
        }
     });
    }

    const style = {fontSize: '3rem'}
    const style1 = {fontSize: '2rem'}
    const styleIcon = { fontSize: '3.5rem', bgcolor: 'black' }
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        bgcolor: 'black',
        border: '4px solid rgb(232, 166, 45)',
        boxShadow: 24,
        p: 4,
        color: 'white'
      };

    return(
        <div className='color'>
            <Header />
            <h2>Modulo de Proveedores</h2>
            <br />

            {
                isLoading ? <Box sx={{display: 'flex'}}>
                <CircularProgress />
                <span>Cargando</span>
            </Box>:
            <div>
            <div className='flex'>
                <button onClick={abrirModalNew} className='boton'>Agrega un nuevo proveedor</button>
            </div>
            {
                msg1 ? newSuccess ? <Stack sx={{ width: '30%', display: 'inline-flex', marginY: '2rem' }} spacing={2}>
                    <Alert style={{ fontSize: '2.8rem' }} variant="filled" severity="success">
                        ¡Agregado correctamente!
                    </Alert>
                </Stack>:
                <Stack sx={{ width: '35%', display: 'inline-flex', marginY: '2rem', fontSize: '1rem' }} spacing={2}>
                    <Alert variant="filled" severity="error">
                    <p>¡Algo salio mal!</p>
                    <p>{Object.values(error).map((val, index) => {
                        return <p key={index} >{val.message}</p>
                    })}</p>
                    </Alert>
                </Stack>:
                <p></p>
            }
            {
                msg2 ? editSuccess ? <Stack sx={{ width: '25%', display: 'inline-flex', marginY: '2rem' }} spacing={2}>
                    <Alert style={{ fontSize: '2.8rem' }} variant="filled" severity="success">
                        ¡Editado correctamente!
                    </Alert>
                </Stack>:
                <Stack sx={{ width: '60%', display: 'inline-flex', marginY: '2rem' }} spacing={2}>
                    <Alert style={{ fontSize: '1.5rem' }} variant="filled" severity="error">
                        <p>¡Algo salio mal! No puede dejar ningún campo vacío</p>
                        
                    </Alert>
                </Stack>:
                <p></p>
            }

            <div className='flex'>
            <TableContainer sx={{ width: '90%' }}  component={Paper}>
            <Table  sx={{ minWidth: 650, color: 'white' }} aria-label="simple table" >
                <TableHead> 
                    <TableRow>
                        <TableCell style={style} align='center'>Acciones</TableCell>
                        <TableCell style={style} align='center'>Empresa</TableCell>
                        <TableCell style={style} align='center'>Descripcion</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        proveedores.map((proveedor, index) => {
                            return(
                                <TableRow 
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align='center' style={style1} sx={{ display: 'flex', justifyContent: 'space-around'  }} >
                                            <IconButton onClick={() => abrirModalEdit(proveedor._id)}> <EditIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                            <IconButton onClick={() => eliminar(proveedor._id)} > <DeleteIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                        </TableCell>
                                        <TableCell align='center' style={style1} >{proveedor.empresa}</TableCell>
                                        <TableCell align='center' style={style1} >{proveedor.descripcion}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        </div>
        }
        <Modal
                open={modalNew}
                onClose={cerraModalNew}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '3rem', display: 'flex' }} >
                        Agregar un proveedor <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        
                        <div className='form-field' >
                            <label>Empresa:</label>
                            <input className="form-control" name="empresa" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field'>
                            <label>Descripcion: </label>
                            <br />
                            <div className='textarea'>
                                <textarea rows='10' cols='30' className="form-control fuente-ta" name="descripcion" onChange={handlerChange} />
                            </div>                            
                        </div> 


                        <div className='botones' >
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant='outlined' onClick={handlerNew}>Agregar</Button>
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant="outlined" color='error' onClick={cerraModalNew} >Cancelar</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={modalEdit}
                onClose={cerraModalEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '3rem', display: 'flex' }} >
                        Editar un proveedor <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        <div className='form-field'>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={form._id}/>
                        </div> 

                        <div className='form-field' >
                            <label>Empresa:</label>
                            <input className="form-control" value={form.empresa} name="empresa" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field'>
                            <label>Descripcion: </label>
                            <br />
                            <div className='textarea'>
                                <textarea rows='10' cols='30' value={form.descripcion} className="form-control fuente-ta" name="descripcion" onChange={handlerChange} />
                            </div>                            
                        </div> 

                        <div className='botones' >
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant='outlined' onClick={handlerEdit}>Guardar</Button>
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant="outlined" color='error' onClick={cerraModalEdit} >Cancelar</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>
            <div className='centrar'><button className='boton' onClick={() => navigate('/Modulos')}>Regresar</button></div>

            <Footer />
        </div>
    );
}

export default Proveedores;