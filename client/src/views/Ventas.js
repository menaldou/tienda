import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVentas, useCreateVenta } from '../hooks/ventasHooks';
import { useProducts, useUpdateProduct } from '../hooks/productsHook';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Ventas.css';
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
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Ventas(){

    const [ modalNew, setModalNew ] = useState(false);
    const [ modalDetail, setModalDetail ] = useState(false);
    const [ modalLista, setModalLista ] = useState(false);
    const [ msg1, setMsg1 ] = useState(false);
    const [ newSuccess, setNewSuccess ] = useState(false);
    const [ error, setError ] = useState({});

    const [ form, setForm ] = useState({ 
        _id: '', 
        numArticulos: '1', 
        articulos: new Array(1).fill({ nombre: '', marca: '', cantidad: '', precio: '', subtotal: '', errorP: false }), 
        fecha: '', 
        total: ''});

    const [ cambio, setCambio ] = useState(0);
    
    const { data: ventas, isLoading } = useVentas();
    const { mutate: crear } = useCreateVenta();

    const { data: productos } =  useProducts();
    const { mutate: editarCantidad } = useUpdateProduct();

    const navigate = useNavigate();

    const abrirModalNew = () => {
        setModalNew(true);
    }

    const cerraModalNew = () => {
        setModalNew(false);
        setForm({ 
            _id: '', 
            numArticulos: '1', 
            articulos: new Array(1).fill({ nombre: '', marca: '', cantidad: '', precio: '', subtotal: '', errorP: false, errorC: false }),  
            total: ''})
    }

    const abrirModalDetail = (id) => {
        const result = ventas.filter(venta => venta._id === id);
        setForm(result[0]);
        setModalDetail(true);

    }

    const cerraModalDetail = () => setModalDetail(false)

    const abrirModalLista = (id) => {
        const result = ventas.filter(venta => venta._id === id);
        setForm(result[0]);
        setModalLista(true);

    }

    const cerraModalLista = () => setModalLista(false)

    const handlerChangeNumeric = (e) => {

        const comp = parseInt(e.target.value);
        const num = parseInt(form.numArticulos);

        if(comp > num) {

            setForm({ ...form, numArticulos: e.target.value });
            form.articulos.push({ nombre: '', marca: '', cantidad: '', precio: '', subtotal: '', errorP: false, errorC: false })

        }else{

            setForm({ ...form, numArticulos: e.target.value });
            form.articulos.pop({ nombre: '', marca: '', cantidad: '', precio: '', subtotal: '', errorP: false, errorC: false })
        }
        
    }


    const handlerChange = (e, index) => {

        const row =  { ...form.articulos[index], [e.target.name]: e.target.value };
        form.articulos.splice(index, 1, row);
        const product = buscarArticulo(form.articulos[index]);

        if(product.length !== 0){
            const row1 = { ...form.articulos[index], precio: product[0].precio, errorP: false }
            form.articulos.splice(index, 1, row1);
            setCambio(cambio + 1);
        }else{
            const row1 = { ...form.articulos[index], precio: '', errorP: true }
            form.articulos.splice(index, 1, row1);
            const r = { ...form.articulos[index], errorP: false };
            setTimeout(() => form.articulos.splice(index, 1, r), 1500);
            setCambio(cambio + 1);
        }

        if(form.articulos[index].cantidad !== '' && form.articulos[index].precio !== ''){

            const cant = parseFloat(form.articulos[index].cantidad);
            const cant1 = product[0].cantidad;


            if(cant <= cant1 ){

                const r = { ...form.articulos[index], errorC: false };
                form.articulos.splice(index, 1, r);
      
                const pre = parseFloat(form.articulos[index].precio);

                const subt = cant * pre + '';
                const row1 = { ...form.articulos[index], subtotal: subt };
                form.articulos.splice(index, 1, row1);

                var t = 0;
                var x = 0;
                form.articulos.forEach(art => {
                    const sub = parseFloat(art.subtotal);
                    t += sub;
                    if(art.subtotal !== '')
                        x++;
                })
        
                if(x + '' === form.numArticulos)
                    setForm({ ...form, total: t + '' });

                setCambio(cambio + 1);

            }else{
                const r = { ...form.articulos[index], precio: '', subtotal: '', errorC: true };
                form.articulos.splice(index, 1, r);
            }
            


        }
    }


    const buscarArticulo = (articulo) => {
        const products = productos.filter(producto => producto.nombre === articulo.nombre && producto.marca === articulo.marca);
        return products
    }

    const reducirExistencias = () => {

        form.articulos.forEach(art => {
            const product = buscarArticulo(art);
            const cant = parseFloat(art.cantidad);
            product[0].cantidad = product[0].cantidad - cant;
            editarCantidad(product[0], { 
                onSuccess: res => console.log(res),
                onError: err => console.log(err)
             });

        })
       
    }

    const handlerNew = () => {

        const f = new Date();
        const fecha = f.getDate() + '/' + (f.getMonth() +1) + '/' + f.getFullYear();
        const numArticulos = form.numArticulos;
        const articulos = form.articulos;
        const total = form.total;

        crear({ numArticulos, articulos, fecha, total } , {

            onSuccess: () => {
                setMsg1(true); 
                setModalNew(false);
                setNewSuccess(true);
                reducirExistencias();
                setForm({ ...form,
                    _id: '', 
                    numArticulos: '1', 
                    articulos: new Array(1).fill({ nombre: '', marca: '', cantidad: '', precio: '', subtotal: '' }), 
                    fecha: '', 
                    total: ''})
                setTimeout(() => {
                    setMsg1(false);
                    setNewSuccess(false);
                }, 1500);
            },

            onError: (err) => {
                console.log(form);
                setCambio(cambio + 1);
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


    const style = {fontSize: '3rem'}
    const style1 = {fontSize: '2rem'}
    const styleIcon = { fontSize: '3.5rem', bgcolor: 'black' }
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
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
        width: '75%',
        bgcolor: 'black',
        border: '4px solid rgb(232, 166, 45)',
        boxShadow: 24,
        p: 4,
        color: 'white'
      };
      const styleModalLista = {
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
            <h2>Modulo de Ventas</h2>
            <br />
            {
                isLoading ? <Box sx={{display: 'flex'}}>
                    <CircularProgress />
                    <span>Cargando</span>
                </Box>:
                <div>
                <div className='flex'>
                    <button onClick={abrirModalNew} className='boton'>Agrega una nueva venta</button>
                </div>
                {
                    msg1 ? newSuccess ? <Stack sx={{ width: '30%', display: 'inline-flex', marginY: '2rem' }} spacing={2}>
                        <Alert style={{ fontSize: '2.8rem' }} variant="filled" severity="success">
                            ¡Agregado correctamente!
                        </Alert>
                    </Stack>:
                    <Stack sx={{ width: '38%', display: 'inline-flex', marginY: '2rem', fontSize: '1rem' }} spacing={2}>
                        <Alert variant="filled" severity="error">
                        <p>¡Algo salio mal!</p>
                        <p>{Object.values(error).map((val, index) => {
                            return <p key={index} >{val.message}</p>
                        })}</p>
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
                            <TableCell style={style} align='center'>ID de la venta</TableCell>
                            <TableCell style={style} align='center'>Numero de articulos</TableCell>
                            <TableCell style={style} align='center'>Articulos</TableCell>
                            <TableCell style={style} align='center'>Fecha</TableCell>
                            <TableCell style={style} align='center'>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            ventas.map((venta, index) => {
                                return(
                                    <TableRow 
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align='center' style={style1} sx={{ display: 'flex', justifyContent: 'space-around'  }} >
                                                <IconButton onClick={() => abrirModalDetail(venta._id)}> <InventoryIcon style={styleIcon} sx={{ bgcolor: 'white' }} /> </IconButton>
                                            </TableCell>
                                            <TableCell align='center' style={style1} >{venta._id}</TableCell>
                                            <TableCell align='center' style={style1} >{venta.numArticulos}</TableCell>
                                            <TableCell align='center' style={style1}> <button onClick={() => abrirModalLista(venta._id)}><LocalGroceryStoreIcon  style={styleIcon} /></button> </TableCell>
                                            <TableCell align='center' style={style1} >{venta.fecha}</TableCell>
                                            <TableCell align='center' style={style1} >{venta.total}</TableCell>
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
                        Agregar una venta <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        
                        <div className='form-field' >
                            <label>Articulos:</label>
                            <input className="form-control" defaultValue='1' min='1' max='10' name="numArticulos" type="number" onChange={handlerChangeNumeric} />
                        </div>
                        <br />
                        <div >
                            {
                                form.articulos.map((val, index) => {
                                    return <div className='factura' key={index} >
                                         <div className='form-field' >
                                                <label>Nombre:</label>
                                                <input className="form-control" name="nombre" type="text" onChange={(e) => handlerChange(e, index)} />  
                                            </div>

                                            <div className='form-field'>
                                                <label htmlFor="combo">Marca: </label>
                                                <select name="marca" onChange={(e) => handlerChange(e, index)} sx={{ bgcolor: 'white' }} >
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
                                                <input className="form-control" name="cantidad" type="text" onChange={(e) => handlerChange(e, index)} />
                                                
                                            </div> 

                                            <div className='form-field'>
                                                <label>Precio:</label>
                                                <input className="form-control" type="text" readOnly value={'$' + form.articulos[index].precio} />
                                            </div>

                                            <div className='form-field'>
                                                <label>Subtotal:</label>
                                                <input className="form-control" type="text" readOnly value={'$' + form.articulos[index].subtotal} />
                                            </div>
                                            {
                                                form.articulos[index].errorP ? <Stack sx={{ width: '20%', display: 'inline-flex' }} spacing={2}>
                                                <Alert style={{ fontSize: '1.6rem' }} variant="filled" severity="error">
                                                    ¡Producto no encontrado!
                                                </Alert>
                                                </Stack>:
                                                <p></p>
                                            }

{
                                                form.articulos[index].errorC ? <Stack sx={{ width: '20%', display: 'inline-flex' }} spacing={2}>
                                                <Alert style={{ fontSize: '1.5rem' }} variant="filled" severity="error">
                                                    ¡Cantidad insuficiente!
                                                </Alert>
                                                </Stack>:
                                                <p></p>
                                            }
                                    </div>
                                })
                            } 
                            <br />
                            <div className='form-field' >
                                 <label>Total:</label>
                                <input readOnly className="form-control" name="total" type="text" value={'$' + form.total}  />  
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
                open={modalDetail}
                onClose={cerraModalDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalDetail}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '3rem', display: 'flex' }} >
                        Detalle de venta <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        <div className='form-field centrar'>
                            <label>ID de la venta:  </label>
                            <label>{form._id}</label> 
                        </div> 

                        <br />

                        <div className='cabeza-factura'>
                        <div className='form-field' >
                                 <label>Numero de articulos: </label>
                                 <label>{form.numArticulos}</label>  
                        </div>
                        <div className='form-field' >
                                 <label>Fecha: </label>
                                 <label>{form.fecha}</label> 
                        </div>
                        <div className='form-field' >
                                 <label>Total: </label>
                                 <label>{form.total + ' $'}</label> 
                        </div>
                        </div>
                        <div className='barra'></div>
                        
                        <br/>
                        <div className='form-field'><label>Articulos:</label></div>
                        <br />
                        <div>
                            {
                                form.articulos.map((product, index) => {
                                    return <div key={index} className='factura sep'>
                                        <div className='form-field' >
                                                <label>Nombre:</label>
                                                <label>{product.nombre}</label>
                                            </div>

                                            <div className='form-field' >
                                                <label>Marca:</label>
                                                <label>{product.marca}</label>
                                            </div>

                                            <div className='form-field' >
                                                <label>Cantidad:</label>
                                                <label>{product.cantidad}</label>
                                            </div>   

                                            <div className='form-field' >
                                                <label>Precio:</label>
                                                <label>{product.precio}</label>
                                            </div>  
                                    </div>
                                })
                            }
                        </div>
                        

                        <div className='botones' >
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant="outlined" color='error' onClick={cerraModalDetail} >Cerrar</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>


            <Modal
                open={modalLista}
                onClose={cerraModalLista}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={styleModalLista}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '3rem', display: 'flex' }} >
                        Lista de productos <TaskAltIcon style={{ fontSize: '2.5rem' }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontSize: '2rem' }}>
                        <div className='barra'></div>
                        <div className='flex-c centrar'>
                           {
                                form.articulos.map((product, index) => {
                                    return <p key={index} >{product.cantidad + ' ' + product.nombre + " - " + product.marca}</p>
                                })
                           }
                        </div>
                        

                        <div className='botones' >
                            <Button sx={{ fontSize: '1.5rem', color: 'white' }} variant="outlined" color='error' onClick={cerraModalLista} >Cerrar</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>     
                   
            <div className='centrar'><button className='boton' onClick={() => navigate('/Modulos')}>Regresar</button></div>

            <Footer />

        </div>
    );
}

export default Ventas;