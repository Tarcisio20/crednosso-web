import { TransportadoraType } from "@/types/TransportadoraType";
import { Cancel, Save } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Input, InputLabel, TextField } from "@mui/material"
import { FormEvent } from "react";

type Props = { 
    open : boolean;
    onClose : ()=> void;
    onSave : (event : FormEvent<HTMLFormElement>) => void;
    transportadora?: TransportadoraType;
    disabled?: boolean;
}

export const TransportadoraEditDialog = ({ open, onClose, onSave, transportadora, disabled } : Props) => {
    
    const handleFormSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSave(event)
    }

    return(
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle component="h5">
                TRANSPORTADORA | 
                <span style={{ color : '#DDD', fontWeight : 'bold' }}>{ transportadora ? 'EDITAR ' : 'NOVA' }</span>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box component="form" onSubmit={handleFormSubmit} >
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='idField'>ID</InputLabel>
                        <TextField
                            id="idField"
                            variant="standard"
                            name="idTransportadora"
                            defaultValue={transportadora?.id}
                            required
                            fullWidth
                            disabled={disabled}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='nameField'>NOME</InputLabel>
                        <TextField
                            id="nameField"
                            variant="standard"
                            name="nameTransportadora"
                            defaultValue={transportadora?.name}
                            required
                            fullWidth
                            disabled={disabled}
                        />

                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='contaField'>Nº CONTA</InputLabel>
                        <TextField
                            id="contaField"
                            variant="standard"
                            name="contaTesouraria"
                            defaultValue={transportadora?.contaTesouraria}
                            required
                            fullWidth
                            disabled={disabled}
                        />

                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <InputLabel variant="standard" htmlFor='saldoField'>SALDO</InputLabel>
                        <TextField
                            id="saldoField"
                            variant="standard"
                            name="saldoTesouraria"
                            type="number"
                            defaultValue={transportadora?.saldo.toFixed(2)}
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