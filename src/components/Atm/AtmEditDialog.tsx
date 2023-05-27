import { FormEvent } from "react";
import { AtmType } from "@/types/AtmType";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { TransportadoraType } from "@/types/TransportadoraType";
import { Cancel, Save } from "@mui/icons-material";

type Props = { 
    open : boolean;
    onClose : ()=> void;
    onSave : (event : FormEvent<HTMLFormElement>) => void;
    atm?: AtmType;
    disabled?: boolean;
    transportadoras: TransportadoraType[];
}



export const AtmEditDialog = ({ open, onClose, onSave, atm, disabled, transportadoras } : Props)  => {

    const handleFormSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSave(event)
    }

    return(
        <Dialog open={open} onClose={onClose} fullWidth >
            <DialogTitle component="h5" >
                ATM | 
                <span style={{ color : '#DDD', fontWeight : 'bold' }}>{ atm ? ' EDITAR' : ' NOVO' }</span>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box component="form" onSubmit={handleFormSubmit} >
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='idField' >ID</InputLabel>
                        <TextField
                            id="idField"
                            variant="standard"
                            name="idAtm"
                            type="number"
                            defaultValue={atm?.id}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='nomeField' >NOME</InputLabel>
                        <TextField
                            id="nomeField"
                            variant="standard"
                            name="nomeAtm"
                            defaultValue={atm?.nome}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='nomeReduzField' >NOME REDUZIDO</InputLabel>
                        <TextField
                            id="nomeReduzField"
                            variant="standard"
                            name="nomeReduzAtm"
                            defaultValue={atm?.nomeReduzido}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb : 2 }} >
                        <InputLabel variant="standard" htmlFor='transportadoraField' >TRANSPORTADORA</InputLabel>
                        <Select
                            id="transportadoraField"    
                            variant="standard"
                            name="transportadora"
                            defaultValue={atm?.transportadoraResponsavel.id || transportadoras[0]?.id}
                            required
                            fullWidth
                            disabled={disabled}
                        >
                            {transportadoras.map(item => (
                                <MenuItem
                                    key={item.id} value={item.id}
                                >{item.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='numSerieField' >NUMERO DE SERIE</InputLabel>
                        <TextField
                            id="numSerieField"
                            variant="standard"
                            name="numSerieAtm"
                            defaultValue={atm?.numeroSerie}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>
                    <Box sx={{ display : 'flex', justifyContent : 'flex-end', gap : 1 }} >
                        <Button variant="outlined" color="error" disabled={disabled} onClick={onClose} >
                            <Cancel color="error" />
                        </Button>
                        <Button variant="outlined" color="success" disabled={disabled} type="submit" >
                            <Save color="success" />
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}