import {  FormEvent, useEffect, useState } from "react";
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

    const [value10, setValue10] = useState('0')
    const [value20, setValue20] = useState('0')
    const [value50, setValue50] = useState('0')
    const [value100, setValue100] = useState('0')

    const [totalField, setTotalField] = useState(0)

    const verifyValuesValuesPurchasse = () => {
        
        if(pedido){
            console.log(pedido)
            setValue10(pedido.value10.toString())   
            setValue20(pedido.value20.toString())   
            setValue50(pedido.value50.toString())   
            setValue100(pedido.value100.toString())   
        }else{
            console.log('Não temos pedido')
            setValue10('0')
            setValue20('0')
            setValue50('0')
            setValue100('0')
        }
    }

    useEffect(()=>{
        verifyValuesValuesPurchasse()
    }, [])

    

   
    const handleValue10 = (e : string) => {
        setValue10(e)
        let value = parseInt(e)
       // setTotal(total + (value * 10))
    }

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
                                <InputLabel variant="standard"  id="idFiled">Id</InputLabel>
                                <TextField
                                    id="idField"   
                                    variant="standard"
                                    name="idPedido"
                                    type="number"
                                    defaultValue={pedido?.id || '#'}
                                    required
                                    fullWidth
                                    disabled
                                    size="small"
                                />
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard"  id="operationField">Tipo de Operação</InputLabel>
                                <Select
                                    id="operationField"
                                    labelId="operationField"
                                    name="operation"
                                    defaultValue={pedido?.typeOperation.id || operations[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    variant="standard"
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
                                <InputLabel variant="standard" htmlFor="originField">Origem</InputLabel>
                               
                                    <Select
                                        id="originField"
                                        variant="standard"
                                        name="origin"
                                        defaultValue={pedido?.origin.id || transportadoras[0]?.id}
                                        required
                                        disabled={disabled}
                                        size="small"
                                        fullWidth
                                    >
                                        {transportadoras?.map(item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >{ pedido?.origin.name || item.name}</MenuItem>
                                        ))}
                                    </Select>
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="destinyField">Destino</InputLabel>
                                <Select
                                    id="destinyField"
                                    variant="standard"
                                    name="destiny"
                                    defaultValue={pedido?.destiny.id || transportadoras[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    size="small"
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
                                <InputLabel variant="standard" htmlFor="dateField">Data do Pedido</InputLabel>
                                <DatePicker
                                    value={datePedido}
                                    defaultValue={dayjs(utils.formatDateForDatePicker(new Date()))}
                                    onChange={newValue => setDatePedido(newValue)}
                                    format="DD/MM/YYYY"
                                    sx={{width : '100%', border : 'none' }}
                                />
                                
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="destinyField">Tipo de Pedido</InputLabel>
                                <Select
                                    id="typeField"
                                    variant="standard"
                                    name="type"
                                    defaultValue={pedido?.typePedido.id || typePedido[0]?.id}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    size="small"
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
                                <InputLabel variant="standard" htmlFor="value10Field">R$ 10,00</InputLabel>
                                <TextField
                                    id="value10Field"
                                    variant="standard"
                                    name="value10Field"
                                    type="number"
                                    value={value10}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    size="small"
                                    onChange={e => handleValue10(e.target.value)}
                                    helperText={utils.valueInCass(10, value10)}
                                />
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="value20Field">R$ 20,00</InputLabel>
                                <TextField
                                    id="value20Field"
                                    variant="standard"
                                    name="value20Field"
                                    type="number"
                                    defaultValue={pedido?.value20 || value20}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    size="small"
                                    onChange={e => setValue20(e.target.value)}
                                    helperText={value20 != ''?utils.valueInCass(20, value20) : 'R$ 00,00'} 
                                />
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="value50Field">R$ 50,00</InputLabel>
                                <TextField
                                    id="value50Field"
                                    variant="standard"
                                    name="value50Field"
                                    type="number"
                                    defaultValue={pedido?.value50 || value50}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    size="small"
                                    onChange={e => setValue50(e.target.value)}
                                    helperText={value50 != ''?utils.valueInCass(50, value50) : 'R$ 00,00'} 
                                />
                            </Box>

                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="value20Field">R$ 100,00</InputLabel>
                                <TextField
                                    id="value100Field"
                                    variant="standard"
                                    name="value100Field"
                                    type="number"
                                    defaultValue={pedido?.value100 || value100}
                                    required
                                    fullWidth
                                    disabled={disabled}
                                    onChange={e => setValue100(e.target.value)}
                                    helperText={value100 != ''?utils.valueInCass(100, value100) : 'R$ 00,00'}   
                                />
                            </Box>
                            <Box sx={{ mb : 2 }}>
                                <InputLabel variant="standard" htmlFor="totalField">Total</InputLabel>
                                <TextField
                                    id="totalField"
                                    variant="standard"
                                    name="totalField"
                                    value={utils.totalValueInPedidoInReal(totalField)}
                                    required
                                    fullWidth
                                    disabled
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ mb : 2 }}>
                        <Box sx={{ mb : 2 }}>
                            <InputLabel variant="standard" htmlFor="obsField">Observação</InputLabel>
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