import Cookies from 'universal-cookie';
import Modulo from '../components/Modulo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Modulos.css';
import '../css/divisas.css'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
//import Maps from "../components/Maps/maps";
import React, { useState, useEffect } from 'react';
import { Paper, TextField, FormControl, Select, Button } from '@material-ui/core';
import Axios from 'axios';

const cookies = new Cookies();


function Modulos() {

    const [text1, settext1] = useState(1);
    const [text2, settext2] = useState(1);
    const [country, setcountry] = useState([]);
    const [country2, setcountry2] = useState([]);
    const [value1, setvalue1] = useState(1);
    const [value2, setvalue2] = useState(1);

    useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const result = await Axios.get("http://data.fixer.io/api/latest?access_key=b844d47107b1c1062a4a0afc144cca5e");
        console.log(result.data);
        setcountry(result.data.rates);
        setcountry2(result.data.rates);
    }

    function convert(e) {
        e.preventDefault();
        let num = (value2 / value1) * text1
        settext2(num);
    }


    // useEffect(() => {
    //     convertCurrency();
    // }, []);

    // const convertCurrency = async () => {
    //     try {
    //         const response = await Axios.get(
    //             `http://data.fixer.io/api/convert?access_key="http://data.fixer.io/api/latest?access_key=b844d47107b1c1062a4a0afc144cca5e"&from=${baseCurrency}&to=${targetCurrency}&amount=${amount}`
    //         );
    //         setResult(response.data.result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const [result, setResult] = useState(null);
    // const [amount, setAmount] = useState(0);
    // const [baseCurrency, setBaseCurrency] = useState('USD');
    // const [targetCurrency, setTargetCurrency] = useState('EUR');



    const cerrarSesion = () => {

        cookies.remove('id', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellido', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('passwd', { path: "/" });
        cookies.remove('admin', { path: "/" });
        window.location.href = './';
    }
    return (
        <div className='color'>
            <Header />

            {
                cookies.get('admin') === 'true' ?
                    <div className='App'>
                        <Modulo Component={LocalGroceryStoreIcon} nombre='Productos' nav='/Modulos/Productos' />
                        <Modulo Component={AttachMoneyIcon} nombre='Ventas' nav='/Modulos/Ventas' />
                        <Modulo Component={LocalShippingIcon} nombre='Proveedores' nav='/Modulos/Proveedores' />
                        <Modulo Component={GroupAddIcon} nombre='Usuarios' nav='/Modulos/Usuarios' />
                    </div> :
                    <div className='App'>
                        <Modulo Component={LocalGroceryStoreIcon} nombre='Productos' nav='/Modulos/Productos' />
                        <Modulo Component={AttachMoneyIcon} nombre='Ventas' nav='/Modulos/Ventas' />
                        <Modulo Component={LocalShippingIcon} nombre='Proveedores' nav='/Modulos/Proveedores' />
                    </div>
            }
            {
                <div className='div-divisas'>
                    <Paper>
                        <h3>Cambio de Divisas</h3>
                        <form onSubmit={convert}>
                            <div>
                                <TextField variant='outlined' value={text1 || ""} onChange={(e) => settext1(e.target.value)} autoComplete='off' />
                                <FormControl
                                    className='dropdown'
                                    variant='outlined'
                                    onChange={(e) => setvalue1(e.target.value)}>

                                    <Select native>
                                        { Object.keys(country).map((value, index) => (
                                            <option key={index} value={country[value]}>
                                                {value}
                                            </option>
                                        ))}

                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField variant='outlined' value={text2 || ""} />
                                <FormControl className='dropdown' variant='outlined' onChange={(e) => setvalue2(e.target.value)}>
                                    <Select native>
                                        {Object.keys(country2).map((value, index) => (
                                            <option key={index} value={country[value]}>
                                                {value}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <Button type='submit' className='button' variant='contained'>
                                Convertir
                            </Button>
                        </form>
                    </Paper>
                </div>
            }


            <div className='centrar'><button className='boton' onClick={cerrarSesion}>Salir</button></div>

            <Footer />
        </div>
    );
}

export default Modulos;
