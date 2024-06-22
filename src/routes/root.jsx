import { Link } from "react-router-dom";

export default function Root() {
    return (
      <>
        <main>
            <section className="flex justify-between items-center p-2">
                <img src="/devto-light.svg" alt="logo" className="size-12"/>
                <nav className="flex justify-center gap-5">
                    <Link to={`/register`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Registrar</Link>
                    <Link to={`/login`} className="font-semibold p-1 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 " >Ingresar</Link>
                </nav>
            </section>
            <section>
              <div className="flex flex-col justify-between items-center gap-5 p-2">
                <h1 className="text-4xl font-bold">{`Home`}</h1>
                <h2 className="w-full text-left text-sm font-semibold">Esta es una ruta cualquiera del modulo web</h2>
              </div>
            </section>
        </main>
      </>
    );
  }