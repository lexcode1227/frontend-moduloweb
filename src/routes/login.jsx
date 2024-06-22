import { useState } from "react";
import { Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { API_URL } from '../../config';

export default function LoginPage() {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
      });
    const [email, setEmail] = useState('')
    const [openModal, setOpenModal] = useState(false);
    
    const navigate = useNavigate();

    const handleEmailInputChange = (e)=>{
        setEmail(e.target.value)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const handleRecoverPass = async(e)=> {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/auth/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            })
            const result = await res.json()
            setEmail('')
            if (result.message) {
                // console.log(result.message)
                setOpenModal(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            })
            const result = await res.json()
            setFormValues({
                username: '',
                password: '',
              })
            if (result.token) {
                const in30Minutes = 1/48; //mini calculo para reducir el tiempo de 1h a 30min
                Cookies.set('authToken', result.token, { expires: in30Minutes });

                navigate('/dashboard')
            } else {
                alert("Error en el login, sin Token")
            }
            
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to={'/'} className="flex items-center mb-6 text-2xl font-bold leading-tight tracking-tight text-gray-900">
                    <img className="w-8 h-8 mr-2" src="/devto-light.svg" alt="logo"/>
                    Devto    
                </Link>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Inicia sesión en tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                                <input type="text" name="username" id="username" onChange={handleInputChange} value={formValues.username} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="admin123" required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" onChange={handleInputChange} value={formValues.password} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" required/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Recuerdame</label>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-blue-600 hover:underline" onClick={() => setOpenModal(true)}>¿Olvidaste tu contraseña?</button>
                            </div>
                            <button type="submit" className="w-full text-white bg-[#2563eb] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ingresar</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Todavia no tienes una cuenta? <Link to={`/register`} className="font-medium text-blue-600 hover:underline">Registrarse</Link>
                            </p>
                        </form>
                    </div>
                </div>
                
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Recuperar contraseña</Modal.Header>
                    <Modal.Body>
                        <div className="p-4 md:p-5 space-y-4">
                            <form className="flex flex-col gap-4" action="#" onSubmit={handleRecoverPass}>
                                <div>
                                    <label htmlFor="emailReset" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                                    <input type="email" name="emailReset" id="emailReset" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required onChange={handleEmailInputChange} value={email}/>
                                </div>
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Recuperar</button>
                                </div>
                            </form>
                            <p className="text-base leading-relaxed text-gray-500">En tu correo podras encontrar un enlace para poder cambiar tu contraseña.</p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </section>
    );
  }