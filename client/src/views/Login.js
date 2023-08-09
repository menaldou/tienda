import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useValidate } from '../hooks/usersHook';
import GitHubLogin from 'react-github-login';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import imgLogo from '../img/imgLogo.png';
import '../css/Login.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
//import { SiGithub } from "react-icons/si";
// import { GoogleLogin } from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';

function Login() {

    const cookies = new Cookies();
    const [user, setUser] = useState({ username: '', passwd: '' });
    const [validator, setValidator] = useState(false);
    const [msg, setMsg] = useState(false);

    const navigate = useNavigate();

    const { mutate: validar } = useValidate();

    const handlerUser = e => {

        setUser({ ...user, [e.target.name]: e.target.value, });
    }

    const iniciarSesion = (e) => {
        e.preventDefault();
        const username = user.username;
        const passwd = md5(user.passwd);
        validar({ username, passwd }, {
            onSuccess: res => {
                if (res.data.msg) {
                    const usuario = res.data.user;
                    cookies.set('id', usuario._id, { path: "/" });
                    cookies.set('nombre', usuario.nombre, { path: "/" });
                    cookies.set('apellido', usuario.apellido, { path: "/" });
                    cookies.set('username', usuario.username, { path: "/" });
                    cookies.set('passwd', md5(usuario.passwd), { path: "/" });
                    cookies.set('admin', usuario.admin, { path: "/" });
                    setValidator(true);
                    setMsg(true);
                    setTimeout(() => navigate('/Modulos'), 1000);

                } else {
                    setValidator(false);
                    setMsg(true);
                }
            }

        })
    }


    const respuestaGitHub = (respuesta) => {
        console.log(respuesta);
        // Aquí puedes realizar las acciones necesarias después del inicio de sesión exitoso con GitHub
    };

    const respuestaGitHubError = (error) => {
        console.error(error);
        // Aquí puedes manejar el error de inicio de sesión con GitHub
    };

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get('username'))
            window.location.href = "./Modulos";
    }, [])



    return (

        <div className='contenedor'>
            <div className="division">
                <img src={imgLogo} alt="portada de Login" className='altura' />
            </div>

            {/*se tiene la estructura para login*/}
            <div className="division form color">
                <div className='titulo'>
                    <h1>Login</h1>
                    <p>Inicia sesión con tus datos</p>
                </div>
                <form >
                    <div className="campo">
                        <label>Nombre de Usuario: </label>
                        <input
                            type="text"
                            placeholder="Tu nombre de usuario"
                            name="username"
                            onChange={handlerUser}
                        />
                    </div>
                    <div className="campo">
                        <label>Contraseña: </label>
                        <input
                            placeholder="Tu contraseña"
                            type="password"
                            name="passwd"
                            onChange={handlerUser}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            msg ? validator ?
                                <Stack sx={{ width: '70%', display: 'flex' }} spacing={2}>
                                    <Alert style={{ fontSize: '2.8rem' }} variant="filled" severity="success">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>¡Bienvenido!</div>
                                    </Alert>
                                </Stack> :
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert style={{ fontSize: '2.8rem' }} variant="filled" severity="error">
                                        ¡El usuario o la contraseña son incorrectos!
                                    </Alert>
                                </Stack> :
                                <p></p>
                        }
                    </div>
                    <br />
                    <div className='contenedor-boton'>
                        <button className="boton" onClick={iniciarSesion}>Iniciar Sesión</button>
                    </div>
                    <div className='titulo'>
                    <p>Inicia sesión con: </p>
                </div>
                    <div  className='contenedor-boton'>
                        <GitHubLogin
                            clientId="63703b546b71cb0a5901"
                            redirectUri="http://localhost:3000/Modulos"
                            onSuccess={respuestaGitHub}
                            onFailure={respuestaGitHubError}  
                            className="boton"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;