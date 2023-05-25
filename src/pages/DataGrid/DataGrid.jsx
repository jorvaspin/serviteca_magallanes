import React, { useMemo, useEffect, useState, useCallback } from 'react'
import MaterialReactTable from "material-react-table";
import './DataGrid.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Edit, Print } from '@mui/icons-material';
import axios from 'axios';

const DataGrid = () => {    

    const url = import.meta.env.VITE_API_BASE_URL
    const [ordenTrabajo, setOrdenTrabajo] = useState([])

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        getOrdenTrabajo()
    }, [])

    const getOrdenTrabajo = async () => {
        const response = await axios.get(url + 'api/getOrdenTrabajos', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+import.meta.env.VITE_API_TOKEN    
            }
        })
        setOrdenTrabajo(response.data)
    }
    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: 'ID',
        },
        {
            accessorKey: "uuid",
            header: 'Código',
        },
        {
            accessorKey: "fecha_recepcion",
            header: 'Fecha Recepción',
        },
        {
            accessorKey: "patente",
            header: 'Patente',
        },
        {
            accessorKey: "marca",
            header: 'Marca',
        },
        {
            accessorKey: "modelo",
            header: 'Modelo',
        },
        {
            accessorKey: "kilometraje",
            header: 'Kilometraje',
        },
        {
            accessorKey: "nombre_cliente", //normal accessorKey
            header: "Nombre Cliente",
        },
        {
            accessorKey: "mecanico",
            header: 'Mécanico',
        },
        {
            accessorKey: "forma_pago",
            header: "Forma de Pago",
        },
        {
            accessorKey: "total_a_pagar",
            header: "Total a Pagar",
        },
        {
            accessorKey: "trabajos_realizados_nombre",
            header: "Trabajos Realizados",
        }
    ])
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: "dark"
            }
        })
    )

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
        //   tableData[row.index] = values;
        //   console.log(values)
        //   console.log(row)

        //   setTableData([...tableData]);
        //   exitEditingMode(); 
        }
     };

     const handleCancelRowEdits = () => {
        setValidationErrors({});
      };
    
      const handleDeleteRow = useCallback(
        (row) => {
        //   if (
        //   ) {
        //     return;
        //   }
        //   tableData.splice(row.index, 1);
        //   setTableData([...tableData]);
        },
        // [tableData],
      );
    

    
    return (
        <div className="table-container">
            <ThemeProvider theme={theme}>
                <MaterialReactTable 
                    columns={columns} 
                    data={ordenTrabajo}
                    enableRowActions
                    editingMode="modal" //default
                    initialState={{ columnVisibility: { id: false, marca: false, modelo: false, kilometraje: false, mecanico: false, trabajos_realizados_nombre: false, fecha_recepcion: false } }}
                    enableColumnOrdering
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Editar">
                        <IconButton onClick={() => table.setEditingRow(row)}>
                            <Edit />
                        </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Imprimir">
                        <IconButton onClick={() => handleDeleteRow(row)}>
                            <Print />
                        </IconButton>
                        </Tooltip>
                    </Box>
                    )}
                    renderTopToolbarCustomActions={() => (
                    <Link to="/createOT"
                        className='btn btn-primary'
                        color="success"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Crear nuevo Orden de trabajo
                    </Link>
                    )}
                />
            </ThemeProvider>
        </div>
    )
    
}

export default DataGrid