import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

export default function ProtectedPage () {
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
    const userName = "lexcode"
    return (
        <main className="p-2">
            <section className="flex justify-between items-center">
                <img src="/devto-light.svg" alt="" className="size-12"/>
                <nav className="flex justify-center gap-5">
                    <Link to={`/register`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Registrar</Link>
                    <Link to={`/login`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Ingresar</Link>
                </nav>
            </section>
            <section className="flex flex-col justify-between items-center gap-5 mt-20">
                <h1 className="text-4xl font-bold">{`Bienvenido ${userName}  al Dashboard`}</h1>
                <h2 className="text-sm font-semibold">Esta es un ruta protegida</h2>
            </section>
        </main>
    )
}