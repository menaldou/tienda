import { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/productsHook';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Productos.css';
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

function Productos(){

    const [ modalNew, setModalNew ] = useState(false);
    const [ modalEdit, setModalEdit ] = useState(false);
    const [ msg1, setMsg1 ] = useState(false);
    const [ msg2, setMsg2 ] = useState(false);
    const [ newSuccess, setNewSuccess ] = useState(false);
    const [ editSuccess, setEditSuccess ] = useState(false);
    const [ error, setError ] = useState({});
    
    const [ form, setForm ] = useState({ _id: '', nombre: '', marca: '', cantidad: '', precio: ''});


    const { data: products, isLoading } = useProducts();
    const { mutate: crear } = useCreateProduct();
    const { mutate: editar } = useUpdateProduct();
    const { mutate: eliminar } = useDeleteProduct();

    const navigate = useNavigate();

    
    const abrirModalNew = () => {
        setModalNew(true);
    }

    const cerraModalNew = () => setModalNew(false)

    const abrirModalEdit = (id) => {
        const result = products.filter(product => product._id === id);
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
                setForm({ _id: '', nombre: '', marca: '', cantidad: '', precio: '' })
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
        <div className="color">
            <Header />
            <h2>Modulo de Productos</h2>
            <br />
            {
                isLoading ? <Box sx={{display: 'flex'}}>
                    <CircularProgress />
                    <span>Cargando</span>
                </Box>:
                <div>
                <div className='flex'>
                    <button onClick={abrirModalNew} className='boton'>Agrega un nuevo producto</button>
                </div>
                {
                    msg1 ? newSuccess ? <Stack sx={{ width: '30%', display: 'inline-flex', marginY: '2rem' }} spacing={2}>
                        <Alert style={{ fontSize: '2.8rem' }} variant="filled" severity="success">
                            ¡Agregado correctamente!
                        </Alert>
                    </Stack>:
                    <Stack sx={{ width: '55%', display: 'inline-flex', marginY: '2rem', fontSize: '1rem' }} spacing={2}>
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
                            <TableCell style={style} align='center'>Nombre</TableCell>
                            <TableCell style={style} align='center'>Marca</TableCell>
                            <TableCell style={style} align='center'>Cantidad</TableCell>
                            <TableCell style={style} align='center'>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((product, index) => {
                                return(
                                    <TableRow 
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align='center' style={style1} sx={{ display: 'flex', justifyContent: 'space-around'  }} >
                                                <IconButton onClick={() => abrirModalEdit(product._id)}> <EditIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                                <IconButton onClick={() => eliminar(product._id)} > <DeleteIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                            </TableCell>
                                            <TableCell align='center' style={style1} >{product.nombre}</TableCell>
                                            <TableCell align='center' style={style1} >{product.marca}</TableCell>
                                            <TableCell align='center' style={style1} >{product.cantidad}</TableCell>
                                            <TableCell align='center' style={style1} >{'$' + product.precio}</TableCell>
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
                        Agregar un producto <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        
                        <div className='form-field' >
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field'>
                            <label htmlFor="combo">Marca: </label>
                            <select name="marca" onChange={handlerChange} sx={{ bgcolor: 'white' }} >
                                <option  value="Escoja una marca">Escoja una marca</option >
                                <option  value="Ritz">Ritz</option >
                                <option  value="Confiteca">Confiteca</option >
                                <option  value="Coca-Cola">Coca-Cola</option >
                                <option  value="Pepsi">Pepsi</option >
                                <option  value="Oreo">Oreo</option >
                                <option  value="Vita">Vita</option >
                                <option  value="La baquita">La baquita</option >
                                <option  value="Pilsener">Pilsener</option >
                                <option  value="Maggi">Maggi</option >
                                <option  value="ColCafe">ColCafe</option >
                                <option  value="ChocoListo">ChocoListo</option >
                            </select>  
                        </div>

                        <div className='form-field'>
                            <label>Cantidad: </label>
                            <input className="form-control" name="cantidad" type="text" onChange={handlerChange} />
                            
                        </div> 

                        <div className='form-field'>
                            <label>Precio:</label>
                            <input className="form-control" name="precio" type="text" onChange={handlerChange} />
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
                        Editar un producto <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        <div className='form-field'>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={form._id}/>
                        </div> 

                        <div className='form-field' >
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={handlerChange} value={form.nombre}/>  
                        </div>

                        <div className='form-field'>
                            <label htmlFor="combo">Marca: </label>
                            <select name="marca" value={form.marca} onChange={handlerChange} sx={{ bgcolor: 'white' }} >
                                <option  value="Ritz">Ritz</option >
                                <option  value="Confiteca">Confiteca</option >
                                <option  value="Coca-Cola">Coca-Cola</option >
                                <option  value="Pepsi">Pepsi</option >
                                <option  value="Oreo">Oreo</option >
                            </select>  
                        </div>

                        <div className='form-field'>
                            <label>Cantidad: </label>
                            <input className="form-control" name="cantidad" type="text" onChange={handlerChange} value={form.cantidad}/>
                            
                        </div> 

                        <div className='form-field'>
                            <label>Precio:</label>
                            <input className="form-control" name="precio" type="text" onChange={handlerChange} value={form.precio}/>
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

export default Productos;