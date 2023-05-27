import { TransportadoraType } from "@/types/TransportadoraType"
import { Delete, Edit } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";

type Props = {
    item : TransportadoraType;
    onEdit : (item : TransportadoraType) => void;
    onDelete : (item : TransportadoraType) => void;
}

export const TransportadoraTableItem = ({ item, onEdit, onDelete } : Props) => {
    return(
        <TableRow hover >
            <TableCell sx={{ width : 50, display : { xs : 'none', md : 'table-cell' } }} >{ item.id }</TableCell>
            <TableCell>{ item.name }</TableCell>
            <TableCell>{ item.contaTesouraria }</TableCell>
            <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >R$ { item.saldo.toFixed(2) }</TableCell>
            <TableCell sx={{  width : { xs : 50, md : 130 }}} >
                <Button size="small" onClick={() => onEdit(item)}>
                    <Edit />
                </Button>
                <Button size="small" onClick={() => onDelete(item)}>
                    <Delete />
                </Button>
            </TableCell>
        </TableRow>
    )
}