import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../../config';
import Cookies from 'js-cookie';

export default function RegisterPage() {
    const [formValues, setFormValues] = useState({
        name: '',
        lastname: '',
        username: '',
        password: '',
        email: '',
      });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            })
            const result = await res.json()
            setFormValues({
                name: '',
                lastname: '',
                username: '',
                password: '',
                email: '',
              })
            alert(result.message)
            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: formValues.username, password: formValues.password})
                })
                const result = await response.json()

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
                            Crear una cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Escribe tu nombre" onChange={handleInputChange} value={formValues.name} required/>
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                                <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Escribe tu apellido" onChange={handleInputChange} value={formValues.lastname} required/>
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Escribe tu usuario" onChange={handleInputChange} value={formValues.username} required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={handleInputChange} value={formValues.password} required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" onChange={handleInputChange} value={formValues.email} required/>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">Acepto los <a className="font-medium text-blue-600 hover:underline" href="#">Terminos y condiciones</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear una cuenta</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta? <Link to={`/login`} className="font-medium text-blue-600 hover:underline">Ingresar aquí</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
  }