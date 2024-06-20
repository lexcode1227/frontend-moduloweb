import { Link } from "react-router-dom";

export default function HomePage() {
  
    return (
      <main className="flex flex-col gap-5 mx-auto my-0 px-3 pt-2 lg:px-0 max-w-[1000px]">
        <section className="flex justify-between items-center">
            <Link to={`/home`}><img src="/devto-light.svg" alt="logo" className="size-12"/></Link>
            <nav className="flex justify-center gap-5">
                <Link to={`/home`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Ingresar</Link>
                <Link to={`/home`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Registrar</Link>
                <Link to={`/home`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Olvidar contra</Link>
            </nav>
        </section>
        <section className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold">Home</h1>
            <h4 className="text-sm font-semibold">Este es el home del web app</h4>
        </section>
      </main>
    );
  }