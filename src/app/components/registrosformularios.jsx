import Box from "@mui/material/Box";
import { GridLinkOperator , DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { RUTA } from "../../config/routes/paths";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Registrosformularios = ({ id }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const llamar = async () => {
            const response = await fetch(`${RUTA}api/forms/obtener/${id}`);
            const objeto = await response.json();
            setData(objeto.body[0]);
        };
        llamar();
    }, [id]);
    return <>{data === null ? "" : <ObtenerFormularios data={data} />}</>;
};

function ObtenerFormularios({ data }) {
    const [pageSize, setPageSize] = useState(5);

    const rows = JSON.parse(data.campos_registro) || [];
    let dataRow = JSON.parse(data.campos_registro) || []
    rows.map((elemen, index) => (elemen["index"] = index));
    
    const [row] = useState(rows);
    let columns;
    if (row.length > 0) {
        columns = Object.entries(row.at(-1))
            .map((el) => el[0])
            .map((fiel) =>
                fiel === "index" ? { field: fiel, hide: true,  hideable: false } : fiel === "fecha" ? { field: fiel,type: 'dateTime',  hideable: false, valueGetter: ({ value }) => value && new Date(value),} : { field: fiel, }
            );
    } else {
        columns = [];
    }
    console.log(dataRow)
    console.log(columns);
    return (
        <div>
            <ExcelFile filename={data.nombre_formulario} element={<button className="btn btn-sami mb-3">EXCEL</button>}>
                <ExcelSheet data={dataRow} name={data.nombre_formulario} >
                  {
                    columns.filter(el => el.field !== "index").map(elemen => {
                        return <ExcelColumn label={elemen.field} value={elemen.field}/>
                    })
                  }
                </ExcelSheet>
            </ExcelFile>
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
                    getRowId={(row) => row.index}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        filterPanel: {
                          // Force usage of "And" operator
                          linkOperators: [GridLinkOperator.And],
                          // Display columns by ascending alphabetical order
                          columnsSort: 'asc',
                          filterFormProps: {
                            // Customize inputs by passing props
                            linkOperatorInputProps: {
                              variant: 'outlined',
                              size: 'small',
                            },
                            columnInputProps: {
                              variant: 'outlined',
                              size: 'small',
                              sx: { mt: 'auto' },
                            },
                            operatorInputProps: {
                              variant: 'outlined',
                              size: 'small',
                              sx: { mt: 'auto' },
                            },
                            valueInputProps: {
                              InputComponentProps: {
                                variant: 'outlined',
                                size: 'small',
                              },
                            },
                            deleteIconProps: {
                              sx: {
                                '& .MuiSvgIcon-root': { color: '#d32f2f' },
                              },
                            },
                          },
                          sx: {
                            // Customize inputs using css selectors
                            '& .MuiDataGrid-filterForm': { p: 2 },
                            '& .MuiDataGrid-filterForm:nth-child(even)': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#444' : '#f5f5f5',
                            },
                            '& .MuiDataGrid-filterFormLinkOperatorInput': { mr: 2 },
                            '& .MuiDataGrid-filterFormColumnInput': { mr: 2, width: 150 },
                            '& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
                            '& .MuiDataGrid-filterFormValueInput': { width: 200 },
                          },
                        },
                      }}
                />
            </Box>
        </div>
    );
}

export default Registrosformularios;
