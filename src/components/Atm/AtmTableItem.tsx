import { AtmType } from "@/types/AtmType";
import { Delete, Edit } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";

type Props = {
    item : AtmType;
    onEdit : (item : AtmType) => void;
    onDelete : (item : AtmType) => void;
}


export const AtmTableItem = ({ item, onEdit, onDelete } : Props) => {
    return(
        <TableRow hover>
            <TableCell sx={{ width : 50, display : { xs : 'none', md : 'table-cell' } }} >{ item.id }</TableCell>
            <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >{ item.nome }</TableCell>
            <TableCell>{ item.nomeReduzido }</TableCell>
            <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >{ item.numeroSerie }</TableCell>
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