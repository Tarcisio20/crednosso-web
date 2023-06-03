import { FormEvent, useState } from "react";
import { OperationType } from "@/types/OperationType";
import { PedidoType } from "@/types/PedidoType";
import { TransportadoraType } from "@/types/TransportadoraType";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { utils } from "@/libs/utils";
import { TypesPedidoType } from "@/types/TypesPedidoType";
import { Cancel, Save } from "@mui/icons-material";

dayjs.locale('pt-br')

type Props = {
    open : boolean;
    onClose : ()=> void;
    onSave : (event : FormEvent<HTMLFormElement>)=>void;
    pedido?: PedidoType;
    disabled?:boolean;
    operations: OperationType[];
    transportadoras : TransportadoraType[];
    typePedido : TypesPedidoType[];
}
export const PedidoEditDialog = (
    { open, onClose, onSave, pedido, disabled, operations  ,transportadoras, typePedido }
     : Props) => {
    
    
    const [datePedido, setDatePedido] = useState<Dayjs | null>()

    const handleFormSubmit = () => {}


    return(
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle component="h5">
                PEDIDO |
                <span style={{ color : '#DDD', fontWeight : 'bold' }}>{ pedido ? ' EDITAR' : ' NOVO' }</span>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box component="form" onSubmit={handleFormSubmit}  >
                    <Box sx={{ display : 'flex', flexDirection : 'row', gap : 3 }} >
                        <Box sx={{ width : '100%' }}>
                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="idField">ID</InputLabel>
                                <TextField
                                    id="idField"
                                    variant="standard"
                                    name="idPedido"
                                    type="number"
                                    defaultValue={pedido?.id || 0}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                />
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="operationField">TIPO OPERAÇÃO</InputLabel>
                                <Select
                                    id="operationField"
                                    variant="standard"
                                    name="operation"
                                    defaultValue={pedido?.typeOperation.id || operations[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                >
                                    {operations?.map(item => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="originField">ORIGEM</InputLabel>
                                <Select
                                    id="originField"
                                    variant="standard"
                                    name="origin"
                                    defaultValue={pedido?.origin.id || transportadoras[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                >
                                    {transportadoras?.map(item => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="destinyField">DESTINO</InputLabel>
                                <Select
                                    id="destinyField"
                                    variant="standard"
                                    name="destiny"
                                    defaultValue={pedido?.destiny.id || transportadoras[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                >
                                    {transportadoras?.map(item => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="dateField">DATA DO PEDIDO</InputLabel>
                            <DatePicker
                                    value={datePedido}
                                    defaultValue={dayjs(utils.formatDateForDatePicker(new Date()))}
                                    onChange={newValue => setDatePedido(newValue)}
                                    format="DD/MM/YYYY"
                                    sx={{width : '100%', border : 'none' }}
                            />
                                
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="destinyField">TIPO DE PEDIDO</InputLabel>
                                <Select
                                    id="typeField"
                                    variant="standard"
                                    name="type"
                                    defaultValue={pedido?.typePedido.id || typePedido[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                >
                                    {transportadoras?.map(item => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                        <Box sx={{ width : '100%' }}>
                            <Box sx={{ mb : 2 }}>
                                <InputLabel htmlFor="value10Field">R$ 10,00</InputLabel>
                                <TextField
                                    id="value10Field"
                                    variant="standard"
                                    name="value10Field"
                                    type="number"
                                    defaultValue={pedido?.value10 || 0}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                />
                                <InputLabel>R$ 00,00</InputLabel>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel htmlFor="value20Field">R$ 20,00</InputLabel>
                                <TextField
                                    id="value20Field"
                                    variant="standard"
                                    name="value20Field"
                                    type="number"
                                    defaultValue={pedido?.value20 || 0}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                />
                                <InputLabel>R$ 00,00</InputLabel>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel htmlFor="value50Field">R$ 50,00</InputLabel>
                                <TextField
                                    id="value50Field"
                                    variant="standard"
                                    name="value50Field"
                                    type="number"
                                    defaultValue={pedido?.value50 || 0}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                />
                                <InputLabel>R$ 00,00</InputLabel>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel htmlFor="value20Field">R$ 100,00</InputLabel>
                                <TextField
                                    id="value100Field"
                                    variant="standard"
                                    name="value100Field"
                                    type="number"
                                    defaultValue={pedido?.value100 || 0}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                />
                                <InputLabel>R$ 00,00</InputLabel>
                            </Box>
                            <Box sx={{ mb : 2 }}>
                                <InputLabel htmlFor="totalField">TOTAL</InputLabel>
                                <TextField
                                    id="totalField"
                                    variant="standard"
                                    name="totalField"
                                    defaultValue={`R$ 00,00`}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ mb : 2 }}>
                        <Box sx={{ mb : 2 }}>
                            <InputLabel variant="standard" htmlFor="obsField">OBSERVAÇÃO</InputLabel>
                            <TextField
                                id="obsField"
                                variant="standard"
                                name="obsField"
                                defaultValue={pedido?.obs || ''}
                                required
                                fullWidth
                                multiline
                                rows={3}
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

                </Box>
            </DialogContent>
        </Dialog>
    )
}