import "./home.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import Main from "../../components/sidebar";
function Home() {
    return (
        <ProSidebarProvider>
            <Main />
        </ProSidebarProvider>
    );
}

export default Home;
// console.log(props);
// const obtenerFormularios = async (id) => {
//     const response = await fetch(`${RUTA}api/forms/obtener/${id}`);
//     const objeto = await response.json();
//     return objeto;
// };
// let formula = await obtenerFormularios(props.id.idformularios);
// console.log(formula);
// formula = formula.body[0];
// let base_campos = JSON.parse(formula.campos);
// console.log(base_campos);
// let base_estructura = formula.diseno_general;
// base_estructura = JSON.parse(base_estructura);
// console.log(base_estructura);
//BaseFormulario