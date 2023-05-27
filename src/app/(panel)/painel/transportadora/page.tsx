"use client";

import { FormEvent, useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import { api } from "@/libs/api";
import { TransportadoraType } from "@/types/TransportadoraType";

import { TransportadoraEditDialog } from "@/components/Transportadora/TransportadoraEditDialog";
import { TransportadoraTableItem } from "@/components/Transportadora/TransportadoraTableItem";
import { TransportadoraTableSkelleton } from "@/components/Transportadora/TransportadoraTableSkelleton";

const Page = () => {

    const [loading, setLoading] = useState(false)
    const [transportadoras, setTransportadoras] = useState<TransportadoraType[]>()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [transportadoraToDelete, setTransportadoraToDelete] = useState<TransportadoraType>()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [transportadoraToEdit, setTransportadoraToEdit] = useState<TransportadoraType>();
    const [loadingEditDialog, setLoadingEditDialog] = useState(false);

    useEffect(()=> {
        getTransportadoras()
    }, [])

    const getTransportadoras = async () => {
        setLoading(true)
        setTransportadoras( await api.getTransportadoras())
        setLoading(false)
    }

    const handleOnDelete = (transportadora : TransportadoraType) => {
        setTransportadoraToDelete(transportadora)
        setShowDeleteDialog(true)
    }

    const handleConfirmDelete = async () => {
        if(transportadoraToDelete){
            setLoadingDelete(true)
            await api.deleteTransportadora(transportadoraToDelete.id)
            setLoadingDelete(false)
            setShowDeleteDialog(false)
            getTransportadoras()
        }
    }

    const handleNewTransportadora = () => {
        setTransportadoraToEdit(undefined)
        setEditDialogOpen(true)
    }

    const handleOnEdit = (transportadora : TransportadoraType) => {
        setTransportadoraToEdit(transportadora)
        setEditDialogOpen(true)

    }

    const handleSaveEditDialog = async (event : FormEvent<HTMLFormElement>) => {
        let form = new FormData(event.currentTarget)

        setLoadingEditDialog(true)
        if(transportadoraToEdit){
            form.append('id', transportadoraToEdit.id.toString())
            await api.updateTransportadora(form)
        }else{
            await api.createTransportadora(form)
        }
        setLoadingEditDialog(false)
        setEditDialogOpen(false)

        getTransportadoras()
    }



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
                    TRANSPORADORAS | <span style={{ color : '#DDD', fontWeight : 'bold' }} >HOME</span>
                </Typography>
                <Button variant="outlined" color="success" sx={{ display : 'flex', alignItems : 'center' }} onClick={handleNewTransportadora}>
                    <Add /> 
                    Adicionar   
                </Button>
            </Box>
            <Divider />
            <Table  sx={{ marginTop : 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width : 50, display : { xs : 'none', md : 'table-cell' } }} >ID</TableCell>
                        <TableCell>NOME</TableCell>
                        <TableCell>CONTA</TableCell>
                        <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >CUSTODIA</TableCell>
                        <TableCell sx={{  width : { xs : 50, md : 130 }}} >AÇÃO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading &&
                        <>
                            <TransportadoraTableSkelleton />
                            <TransportadoraTableSkelleton />
                            <TransportadoraTableSkelleton />
                            <TransportadoraTableSkelleton />
                            <TransportadoraTableSkelleton />
                        </>
                    }
                    {!loading && transportadoras?.map((item)=>(
                            <TransportadoraTableItem
                                key={item.id}
                                item={item}
                                onEdit={handleOnEdit}
                                onDelete={handleOnDelete}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <Dialog open={showDeleteDialog} onClose={()=> !loadingDelete ? setShowDeleteDialog(false) : null } >
                <DialogTitle>Deseja realmente deletar essa transportadora?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Esse ato causa um efeito cascata no sistema.</DialogContentText>
                    <DialogActions>
                        <Button disabled={loadingDelete} onClick={()=>setShowDeleteDialog(false)}>Não</Button>
                        <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Sim</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            
            <TransportadoraEditDialog
                open={editDialogOpen}
                onClose={()=>setEditDialogOpen(false)}
                onSave={handleSaveEditDialog}
                disabled={loadingEditDialog}
                transportadora={transportadoraToEdit}
            />
        </Box>
    )
}

export default Page