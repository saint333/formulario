import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar  } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

function Registrosformularios({ id }) {
    console.log(id);
    const [pageSize, setPageSize] = useState(5);
    // const [checkboxSelection, setCheckboxSelection] = useState(true);

    const rows = [
        { id: 1, col1: "Hello", col2: "World", col3: "10" },
        { id: 3, col1: "Material UI", col2: "is amazing", col3: "3" },
    ];
    const [row, setRow] = useState(rows);
    const deleteUser = useCallback(
        (id) => () => {
            setTimeout(() => {
                setRow((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        []
    );
    const editarUser = useCallback(
        (id) => () => {
            setTimeout(() => {
                // setRow((prevRows) => prevRows.filter((row) => row.id !== id));
                console.log(id);
            });
        },
        []
    );
    const columns = [
        { field: "id", hide: false },
        { field: "col1", headerName: "Formulario", width: 300 },
        { field: "col2", headerName: "Fecha de Creación", width: 300 },
        {
            field: "col3",
            headerName: "N° de Ingresos",
            width: 200,
            renderCell: (params) => (
                <Link to={`registros/${params.value}`}>{params.value}</Link>
            ),
        },
        {
            field: "actions",
            type: "actions",
            width: 200,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<MdDeleteOutline style={{ fontSize: "20px" }} />}
                    label='Delete'
                    onClick={deleteUser(params.id)}
                />,
                <GridActionsCellItem
                    icon={<FiEdit style={{ fontSize: "20px" }} />}
                    label='Editar'
                    onClick={editarUser(params)}
                />,
            ],
        },
    ];

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <DataGrid
                    autoHeight
                    rows={row}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    disableSelectionOnClick
                    disableColumnMenu
                    components={{ Toolbar: GridToolbar }} 
                />
            </Box>
        </div>
    );
}

export default Registrosformularios;
