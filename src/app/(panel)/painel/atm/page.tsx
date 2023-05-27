"use client";

import { FormEvent, useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AtmTableSkelleton } from "@/components/Atm/AtmTableSkelleton";
import { AtmType } from "@/types/AtmType";
import { api } from "@/libs/api";
import { AtmTableItem } from "@/components/Atm/AtmTableItem";
import { TransportadoraType } from "@/types/TransportadoraType";
import { AtmEditDialog } from "@/components/Atm/AtmEditDialog";

const Page = () => {

    const [loading, setLoading] = useState(false)
    const [atms , setAtms] = useState<AtmType[]>([])
    const [transportadoras, setTransportadoras] = useState<TransportadoraType[]>([])

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [atmToDelete, setAtmToDelete] = useState<AtmType>()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [loadingEditDialog, setLoadingEditDialog] = useState(false)
    const [atmToEdit, setAtmToEdit] = useState<AtmType>()

    useEffect(()=>{
        getAtms()
    }, [])

    const getAtms = async () => {
        setLoading(true)
        setAtms( await api.getAtms())
        setTransportadoras( await api.getTransportadoras() )
        setLoading(false)
    }

    const handleOnEdit = (atm : AtmType) => {
        setAtmToEdit(atm)
        setEditDialogOpen(true)
    }

    const handleOnDelete = (atm : AtmType) => {
        setAtmToDelete(atm)
        setShowDeleteDialog(true)
    }

    const handleNewAtm = () => {
        setAtmToEdit(undefined)
        setEditDialogOpen(true)
    }

    const handleConfirmDelete = async ()  => {
        if(atmToDelete){
            setLoadingDelete(true)
            await api.deleteTransportadora(atmToDelete.id)
            setLoadingDelete(false)
            setShowDeleteDialog(false)
            getAtms()
        }
    }

    const handleSaveEditDialog = async (event : FormEvent<HTMLFormElement>) => {
        let form = new FormData(event.currentTarget)

        setLoadingEditDialog(true)
        if(atmToEdit){
            form.append('id', atmToEdit.id.toString())
            await api.upgradeAtm(form)
        }else{
            await api.createAtm(form)
        }
        setLoadingEditDialog(false)
        setEditDialogOpen(false)

        getAtms()
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
                    ATMS | <span style={{ color : '#DDD', fontWeight : 'bold' }} >HOME</span>
                </Typography>
                <Button variant="outlined" color="success" sx={{ display : 'flex', alignItems : 'center' }} onClick={handleNewAtm}>
                    <Add /> 
                    Adicionar   
                </Button>
            </Box>
            <Divider />
            <Table  sx={{ marginTop : 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width : 50, display : { xs : 'none', md : 'table-cell' } }} >ID</TableCell>
                        <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >NOME</TableCell>
                        <TableCell>REDUZIDO</TableCell>
                        <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >SERIE</TableCell>
                        <TableCell sx={{  width : { xs : 50, md : 130 }}} >AÇÃO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && 
                        <>
                            <AtmTableSkelleton />
                            <AtmTableSkelleton />
                            <AtmTableSkelleton />
                            <AtmTableSkelleton />
                            <AtmTableSkelleton />
                        </>
                    }
                    {!loading && atms?.map(item => (
                        <AtmTableItem
                            key={item.id}
                            item={item}
                            onEdit={handleOnEdit}
                            onDelete={handleOnDelete}
                        />
                    ))}
                </TableBody>
            </Table>

            <Dialog open={showDeleteDialog} onClose={ ()=> !loadingDelete ? setShowDeleteDialog(false) : null } >
                <DialogTitle>Deseja realmente deletar essa ATM?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Esse ato causa um efeito cascata no sistema.</DialogContentText>
                    <DialogActions>
                        <Button disabled={loadingDelete} onClick={()=>setShowDeleteDialog(false)}>Não</Button>
                        <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Sim</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            

            <AtmEditDialog
                open={editDialogOpen}
                onClose={()=> setEditDialogOpen(false)}
                onSave={handleSaveEditDialog}
                disabled={loadingEditDialog}
                atm={atmToEdit}
                transportadoras={transportadoras}
            />
        </Box>

    )
}

export default Page