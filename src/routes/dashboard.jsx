import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { API_URL } from '../../config';

export default function DashboardPage () {
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('authToken');
        navigate('/login');
      };

    useEffect( ()=>{
        const token = Cookies.get('authToken');
        async function fetchData(){
            const res = await fetch(`${API_URL}/api/auth/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            })
            const result = await res.json()
            setUserData(result.data);
        }
        if (token) {
            fetchData()
        } else {
            navigate('/')
        }
    },[])
    return (
        <main className="p-2">
            <section className="flex justify-between items-center">
                <img src="/devto-light.svg" alt="" className="size-12"/>
                <nav className="flex justify-center gap-5">
                    <button className="py-3 px-5 font-bold rounded bg-blue-500 border-blue-500 border text-white hover:bg-white hover:text-blue-500 hover:border-blue-800 hover:border" onClick={handleLogout}>Salir</button>
                </nav>
            </section>
            <section className="flex flex-col justify-between items-center gap-5 mt-20">
                <h1 className="text-4xl font-bold">Bienvenido <span className="text-4xl font-bold text-blue-500">{userData?.username}</span> al Dashboard</h1>
                <h2 className="text-xl font-semibold">Esta es un ruta protegida</h2>
            </section>
        </main>
    )
}