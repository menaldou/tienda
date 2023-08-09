import { useState } from 'react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/usersHook';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Usuarios.css';
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
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function Usuarios(){

    const [ modalNew, setModalNew ] = useState(false);
    const [ modalEdit, setModalEdit ] = useState(false);
    const [ modalDetail, setModalDetail ] = useState(false);
    const [ msg1, setMsg1 ] = useState(false);
    const [ msg2, setMsg2 ] = useState(false);
    const [ newSuccess, setNewSuccess ] = useState(false);
    const [ editSuccess, setEditSuccess ] = useState(false);
    const [ error, setError ] = useState({});

    const [ form, setForm ] = useState({ 
        _id: '',
        nombre: '',
        apellido: '',
        img: '',
        cedula: '',
        username: '',
        passwd: '',
        confirmPassword: '',
        admin: false
    });


    const { data: users, isLoading } = useUsers();
    const { mutate: crear } = useCreateUser();
    const { mutate: editar } = useUpdateUser();
    const { mutate: eliminar } = useDeleteUser();

    const navigate = useNavigate();

    const abrirModalNew = () => {
        setModalNew(true);
    }

    const cerraModalNew = () => setModalNew(false)

    const abrirModalEdit = (id) => {
        const result = users.filter(user => user._id === id);
        if(result[0].admin === 'true'){
            setForm({ ...result[0], admin: true, passwd: '', confirmPassword: '' });
        }else{
            setForm({ ...result[0], admin: false, passwd: '', confirmPassword: '' });
        }
        
        console.log(form)
 
        setModalEdit(true);

    }

    const cerrarModalEdit = () => setModalEdit(false);

    const abrirModalDetail = (id) => {
        const result = users.filter(user => user._id === id);
        setForm(result[0]);
        setModalDetail(true);

    }

    const cerraModalDetail = () => setModalDetail(false)

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const handlerPasswd = (e) => {
        setForm({ ...form, [e.target.name]: md5(e.target.value) })
    }

    const handlerChangeCheck = (e) => {
        setForm({ ...form, admin: !form.admin });
    }

    const handlerNew = () => {
        crear({ ...form}, {

            onSuccess: () => {
                setMsg1(true); 
                setModalNew(false);
                setNewSuccess(true);
                setForm({ _id: '',
                nombre: '',
                apellido: '',
                img: '',
                username: '',
                passwd: '',
                confirmPassword: '',
                admin: false})
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
        })
    };

    const handlerEdit = () => {
        

        editar({ ...form }, { 
        onSuccess: res  => {
            if(res.data.bool){
                setMsg2(true); 
                setModalEdit(false);
                setEditSuccess(true);
                setForm({ 
                    _id: '',
                    nombre: '',
                    apellido: '',
                    img: '',
                    cedula: '',
                    username: '',
                    passwd: '',
                    confirmPassword: '',
                    admin: false
                });
                setTimeout(() => {
                setMsg2(false);
                setEditSuccess(false);
                }, 1500);
            }else{
                setError(res.data.msg);
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
        width: '36%',
        bgcolor: 'black',
        border: '4px solid rgb(232, 166, 45)',
        boxShadow: 24,
        p: 4,
        color: 'white'
      };
      const styleModalDetail = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'black',
        border: '4px solid rgb(232, 166, 45)',
        boxShadow: 24,
        p: 4,
        color: 'white'
      };
    return(
        <div className="color" >
            <Header />
            <h2>Modulo de Usuarios</h2>
            <br />

            {
                isLoading ? <Box sx={{display: 'flex'}}>
                <CircularProgress />
                <span>Cargando</span>
            </Box>:
            <div>
            <div className='flex'>
                <button onClick={abrirModalNew} className='boton'>Agrega un nuevo usuario</button>
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
                        <p>¡Algo salio mal! {error}</p>
                        
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
                        <TableCell style={style} align='center'>Nombre de usuario</TableCell>
                        <TableCell style={style} align='center'>Administrador</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user, index) => {
                            return(
                                <TableRow 
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align='center' style={style1} sx={{ display: 'flex', justifyContent: 'space-around'  }} >
                                            <IconButton onClick={() => abrirModalDetail(user._id)}> <InventoryIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                            <IconButton onClick={() => abrirModalEdit(user._id)}> <EditIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                            <IconButton onClick={() => eliminar(user._id)} > <DeleteIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                        </TableCell>
                                        <TableCell align='center' style={style1} >{user.nombre + ' ' + user.apellido}</TableCell>
                                        <TableCell align='center' style={style1} >{user.username}</TableCell>
                                        <TableCell align='center' style={style1} >{ user.admin === 'true' ? 'Si': 'No' }</TableCell>
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
                        Agregar un usuario <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        
                        <div className='form-field' >
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Apellido:</label>
                            <input className="form-control" name="apellido" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Imagen:</label>
                            <input className="form-control" name="img" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Cedula:</label>
                            <input className="form-control" name="cedula" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Nombre de usuario:</label>
                            <input className="form-control" name="username" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Contraseña:</label>
                            <input className="form-control" name="passwd" type="password" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Confirmar contraseña:</label>
                            <input className="form-control" name="confirmPassword" type="password" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Administrador:</label>
                            <input className="form-control" name="admin" type="checkbox" onChange={handlerChangeCheck} />  
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
                onClose={cerrarModalEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '3rem', display: 'flex' }} >
                        Editar un usuario <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        <div className='form-field'>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={form._id}/>
                        </div> 

                        <div className='form-field' >
                            <label>Nombre:</label>
                            <input className="form-control" value={form.nombre} name="nombre" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Apellido:</label>
                            <input className="form-control" value={form.apellido} name="apellido" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Imagen:</label>
                            <input className="form-control" value={form.img} name="img" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Cedula:</label>
                            <input className="form-control" value={form.cedula} name="cedula" type="text" onChange={handlerChange} />  
                        </div>


                        <div className='form-field' >
                            <label>Nombre de usuario:</label>
                            <input className="form-control" value={form.username} name="username" type="text" onChange={handlerChange} />  
                        </div>

                        <div className='form-field' >
                            <label>Contraseña:</label>
                            <input className="form-control" name="passwd" type="password" onChange={handlerPasswd} />  
                        </div>

                        <div className='form-field' >
                            <label>Confirmar contraseña:</label>
                            <input className="form-control" name="confirmPassword" type="password" onChange={handlerPasswd} />  
                        </div>

                        <div className='form-field' >
                            <label>Administrador:</label>
                            <input className="form-control" checked={form.admin} name="admin" type="checkbox" onChange={handlerChangeCheck} />  
                        </div>

                        <div className='botones' >
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant='outlined' onClick={handlerEdit}>Guardar</Button>
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant="outlined" color='error' onClick={cerrarModalEdit} >Cancelar</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={modalDetail}
                onClose={cerraModalDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalDetail}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '3rem', display: 'flex' }} >
                        Detalle del usuario <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        <div className='form-field centrar'>
                            <label>ID del usuario:  </label>
                            <label>{form._id}</label> 
                        </div> 

                        <br />

                        <div >
                            <div className='centrar'>
                                <img src={form.img} alt='Img del usuario' />
                            </div  >

                            <div className='detail'>
                            <div className='form-field' >
                                <label>Nombre:</label>
                                <label>{form.nombre}</label>
                            </div>
                            <div className='form-field' >
                                <label>Apellido:</label>
                                <label>{form.apellido}</label>
                            </div>

                            <div className='form-field' >
                                <label>Nombre de usuario:</label>
                                <label>{form.username}</label>
                            </div>   

                            <div className='form-field' >
                                <label>No. de Cedula:</label>
                                <label>{form.cedula}</label>
                            </div>   

                            <div className='form-field' >
                                <label>Administrador:</label>
                                <label>{form.admin === 'true' ? 'Si':'No'}</label>
                            </div>  
                            
                            </div>
                        </div>
                        
                        <div className='barra'></div>
                        <div className='botones' >
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant="outlined" color='error' onClick={cerraModalDetail} >Cerrar</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>

            <div className='centrar'><button className='boton' onClick={() => navigate('/Modulos')}>Regresar</button></div>

            <Footer />
        </div>
    );
}

export default Usuarios;