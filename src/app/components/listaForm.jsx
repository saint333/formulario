import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Registrosformularios from "./registrosformularios";
import Button from "react-bootstrap/esm/Button";
import { useAuthContext } from "../../config/authentication/authentication";
import Modal from "react-bootstrap/Modal";
import { RUTA } from "../../config/routes/paths";
import BaseFormulario from "../pages/base_formulario/base_formulario";

export default function ListaFormularios() {
    const { autenticado } = useAuthContext();
    const [rows, setRows] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState(null);
    const [show2, setShow2] = useState(false);
    const handleClose = async () => {
        const response = await fetch(`${RUTA}api/forms`, {
            method: "DELETE",
            body: JSON.stringify({
                id: form,
                dni: autenticado.dni,
            }),
            headers: {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
            },
        });
        console.log(
            JSON.stringify({
                id: form,
                dni: autenticado.dni,
            })
        );
        const data = await response.json();
        if (data.estado) {
            setShow(false);
            document.getElementById(form).remove();
        }
    };
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const [id2, setId2] = useState("");
    const handleShow2 = (index) => {
        setId2(index);
        setShow2(true);
    };
    useEffect(() => {
        const peticion = async () => {
            const response = await fetch(`${RUTA}api/forms/${autenticado.dni}`);
            const data = await response.json();
            setRows(data.body);
        };
        peticion();
    }, [autenticado]);
    const [id, setId] = useState("");
    const [ideditar, setIdeditar] = useState("");
    const eliminar = (query) => {
        handleShow();
        setForm(query);
    };
    const editar = (data) => {
        setIdeditar(data);
    };
    let ruta = window.location.origin;
    return (
        <>
            {id === "" && ideditar === "" ? (
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-truncate d-none d-md-block">N°</th>
                            <th className="text-truncate">Formulario</th>
                            <th className="text-truncate d-none d-md-block">Fecha de creación</th>
                            <th className="text-truncate">N° de registros</th>
                            <th className="text-truncate"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((element, index) => (
                            <tr
                                key={element.idformularios}
                                id={element.idformularios}
                                
                            >
                                <td className="text-truncate d-none d-md-block">{index + 1}</td>
                                <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        handleShow2(element.idformularios)
                                    }
                                    className="text-truncate"
                                >
                                    {element.nombre_formulario}
                                </td>
                                <td className="text-truncate d-none d-md-block">{element.fecha_creacion.split("T")[0]}</td>
                                <td>
                                    <span
                                        onClick={() =>
                                            setId(element.idformularios)
                                        }
                                        style={{ cursor: "pointer" }}
                                        className="text-truncate"
                                    >
                                        {element.cantidad_de_registro}
                                    </span>
                                </td>
                                <td className='d-flex justify-content-evenly'>
                                    <Button
                                        variant='light-2'
                                        className='d-flex align-items-center'
                                        onClick={() => editar(element)}
                                    >
                                        <FiEdit />
                                    </Button>
                                    <Button
                                        variant='light-2'
                                        className='d-flex align-items-center'
                                        onClick={() =>
                                            eliminar(element.idformularios)
                                        }
                                    >
                                        <MdDeleteOutline />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : ideditar === "" ? (
                <Registrosformularios id={id} />
            ) : (
                <BaseFormulario idform={ideditar}/>
            )}

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop='static'
            >
                <Modal.Header>
                    <Modal.Title>Formulario borrado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Estas seguro de borrar este formulario, teniendo en cuenta
                    que los datos ya no apareceran
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='sami' onClick={() => setShow(false)}>
                        no
                    </Button>
                    <Button variant='danger' onClick={handleClose}>
                        Si
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show2}
                onHide={handleClose2}
                keyboard={false}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Codigo de insertado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <code className='bg-black d-inline-block my-5 p-2 w-100'>
                        {`<script>
                          if (window.form === undefined) {
                            window.form = [];
                        }
                        window.form.push(${id2});
                    </script>`}
                        <br />
                        {`<script src="${ruta}/forms/form.js"></script>`}
                    </code>
                </Modal.Body>
            </Modal>
        </>
    );
}
