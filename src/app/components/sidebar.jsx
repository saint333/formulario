import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { MdDashboard } from "react-icons/md";
import { AiOutlineMenu, AiOutlinePlusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import Logou from "./logout/logout";
import ListaFormularios from "./listaForm";
import { BiLogOut } from "react-icons/bi";
import Tarjetas from "./nuevo-form";
import { useAuthContext } from "../../config/authentication/authentication";
import { RUTA } from "../../config/routes/paths";

function Main() {
    const { autenticado, logout,logins } = useAuthContext();
    const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
    const [page, setPage] = useState("");
    useEffect(() => {
        const CerrarSesion = async () => {
            await fetch(`${RUTA}api/user/sesion/${autenticado.dni}`, {
                method: "PUT",
                body: JSON.stringify({
                    sesion: 0,
                }),
                headers: {
                    Accept: "*/*",
                    "User-Agent":
                        "Thunder Client (https://www.thunderclient.com)",
                    "Content-Type": "application/json",
                },
            });
            logout();
        };
        const verificar = async () => {
          let usuarios = await logins(autenticado.dni);
          if (usuarios.body[0].sesion_activa === 0) {
            CerrarSesion();
          }
        }
        verificar()
    }, [autenticado, logout,logins,page]);
    
    const cambiarvista = (e) => {
        setPage(e);
    };

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Sidebar customBreakPoint='800px' backgroundColor='#e0e0e0'>
                <Menu>
                    <MenuItem
                        onClick={(e) => cambiarvista(<ListaFormularios />)}
                    >
                        {" "}
                        <MdDashboard className='mx-2' />{" "}
                        <span className='ms-1'>Mis Formularios</span>
                    </MenuItem>
                    <MenuItem onClick={(e) => cambiarvista(<Tarjetas />)}>
                        {" "}
                        <AiOutlinePlusSquare className='mx-2' />{" "}
                        <span className='ms-1'>Crear Formularios</span>
                    </MenuItem>
                    <MenuItem onClick={(e) => cambiarvista(<Logou />)}>
                        {" "}
                        <BiLogOut className='mx-2' />{" "}
                        <span className='ms-1'>Cerrar Sesión</span>
                    </MenuItem>
                </Menu>
            </Sidebar>
            <main className='ms-3 w-100'>
                {broken ? (
                    <button
                        className='sb-button btn'
                        onClick={() => toggleSidebar()}
                    >
                        <AiOutlineMenu />
                    </button>
                ) : (
                    <button onClick={() => collapseSidebar()} className='btn'>
                        <AiOutlineMenu />
                    </button>
                )}
                <span></span>
                <>{page === "" ? <ListaFormularios /> : page}</>
            </main>
        </div>
    );
}

export default Main;
