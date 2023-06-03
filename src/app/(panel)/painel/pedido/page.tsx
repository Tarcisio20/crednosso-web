"use client";

import { PedidoEditDialog } from "@/components/pedido/PedidoEditDialog";
import { api } from "@/libs/api";
import { OperationType } from "@/types/OperationType";
import { PedidoType } from "@/types/PedidoType";
import { TransportadoraType } from "@/types/TransportadoraType";
import { TypesPedidoType } from "@/types/TypesPedidoType";
import { Add, Search } from "@mui/icons-material";
import { Box, Button, Divider, InputLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { utils } from "@/libs/utils";

dayjs.locale('pt-br')

const Page = () => {

    const [pedidos, setPedidos] = useState<PedidoType[]>([])
    const [transportadoras, setTransportadoras] = useState<TransportadoraType[]>([])
    
    const [pedidoToEdit, setPedidoToEdit] = useState<PedidoType>()
    const [operations, setOperations] = useState<OperationType[]>([])
    const [types, setTypes] = useState<TypesPedidoType[]>([])
    const [loading, setLoading] = useState(false)

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [loadingEditDialog, setLoadingEditDialog] = useState(false)
    
    const [dateInitial, setDateInitial] = useState<Dayjs | null>()
    const [dateFinal, setDateFinal] = useState<Dayjs | null>()

    useEffect(()=>{
        getPedidos()
    }, [])

    const getPedidos = async () => {
        setLoading(true)
        setPedidos(await api.getPedidos())
        setTransportadoras(await api.getTransportadoras())
        setOperations(await api.getOperations())
        setTypes(await api.getTypes())
        setLoading(false)
    }


    const handleSaveEditDialog = () => {}
    const handleNewAtm = () => {
        setPedidoToEdit(undefined)
        setEditDialogOpen(true)
    }

    const handleFormSearchSubmit = () => {}

    return(
        <Box sx={{ my: 3 }}>
             <Box sx={{ 
                    display: 'flex',
                    flexDirection : 'row',
                    alignItems : 'center',
                    justifyContent: 'space-between',
                    marginBottom : 2,
                    paddingLeft : 10,
                    paddingRight : 10
                }}>
                    <Typography component="h5" variant="h5"  >
                        PEDIDOS | <span style={{ color : '#DDD', fontWeight : 'bold' }} >HOME</span>
                    </Typography>
                    <Button variant="outlined" color="success" sx={{ display : 'flex', alignItems : 'center' }} onClick={handleNewAtm}>
                        <Add /> 
                        Adicionar   
                    </Button>
            </Box>
            <Divider />
            <Box>
                <Typography component="h5" variant="h5"  >
                    FILTROS | <span style={{ color : '#DDD', fontWeight : 'bold' }} >PEDIDOS</span>
                </Typography>
                <Box component="form" onSubmit={handleFormSearchSubmit} 
                    sx={{ display : 'flex', flexDirection : 'row', alignItems: 'center', gap : 3 }}
                > 
                    <Box sx={{ mb : 2, width : '20%' }}>
                        <InputLabel variant="standard" htmlFor="initialDateField">DATA INICIAL</InputLabel>
                        <DatePicker
                            value={dateInitial}
                            defaultValue={dayjs(utils.formatDateForDatePicker(new Date()))}
                            onChange={newValue => setDateInitial(newValue)}
                            format="DD/MM/YYYY"
                            sx={{width : '100%', border : 'none' }}
                        />
                    </Box>
                    <Box sx={{ mb : 2, width : '20%' }}>
                        <InputLabel variant="standard" htmlFor="finalDateField">DATA FINAL</InputLabel>
                        <DatePicker
                            value={dateFinal}
                            defaultValue={dayjs(utils.formatDateForDatePicker(new Date()))}
                            onChange={newValue => setDateFinal(newValue)}
                            format="DD/MM/YYYY"
                            sx={{width : '100%', border : 'none' }}
                        />
                    </Box>
                    <Box  sx={{  width : '20%' }}>
                        <Button sx={{ width : '100%' }} variant="outlined" color="success" >
                            <Search />
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Divider />



            <PedidoEditDialog
                open={editDialogOpen}
                onClose={()=>setEditDialogOpen(false)}
                onSave={handleSaveEditDialog}
                disabled={loadingEditDialog}
                pedido={pedidoToEdit}
                operations={operations}
                transportadoras={transportadoras}
                typePedido={types}
            />

        </Box>
    )
}

export default Page