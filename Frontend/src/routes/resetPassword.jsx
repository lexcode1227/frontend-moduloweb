import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from '../../config';

export default function ResetPasswordPage() {
    const [formValues, setFormValues] = useState({
        newPassword: '',
        newPassword2: '',
        resetToken: ''
      });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    useEffect(() => {
        if (token) {
          setFormValues({
            ...formValues,
            resetToken: token
        });
          console.log('Reset Token:', token);
        } else {
            navigate('/')
        }
      }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formValues.newPassword !== formValues.newPassword2) {            
            return alert("Las contraseñas no coinciden")
        }
        try {
            const res = await fetch(`${API_URL}/api/auth/changePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${formValues.resetToken}`
                },
                body: JSON.stringify({newPassword: formValues.newPassword})
            })
            const result = await res.json()
            setFormValues({
                newPassword: '',
                newPassword2: '',
                resetToken: ''
                })
            if (result.message) {
                console.log(result.message)
                navigate('/login')
            } else {
                alert(`Error: ${result.errorMessage}`)
            }
                
        } catch (error) {
            console.log(error.message);
        }

    };
  
    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-bold leading-tight tracking-tight text-gray-900">
                    <img className="w-8 h-8 mr-2" src="/devto-light.svg" alt="logo"/>
                    Devto    
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                            <input type="password" name="newPassword" id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required onChange={handleInputChange} value={formValues.newPassword}/>
                        </div>
                        <div>
                            <label htmlFor="newPassword2" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                            <input type="password2" name="newPassword2" id="newPassword2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required onChange={handleInputChange} value={formValues.newPassword2}/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newsletter" className="font-light text-gray-500">Acepto los <a className="font-medium text-primary-600 hover:underline " href="#">Terminos y condiciones</a></label>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Reset password</button>
                    </form>
                </div>
            </div>
        </section>
    );
  }