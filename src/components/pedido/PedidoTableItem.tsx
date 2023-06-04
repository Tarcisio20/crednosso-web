import { PedidoType } from "@/types/PedidoType";
import { Delete, Edit } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";

type Props = {
  item: PedidoType;
  onEdit: (item: PedidoType) => void;
  onDelete: (item: PedidoType) => void;
};

export const PedidoTableItem = ({ item, onEdit, onDelete }: Props) => {
  const valueTotal = (
    valueA: number,
    valueB: number,
    valueC: number,
    valueD: number
  ) => {
    return valueA + valueB + valueC + valueD;
  };

  return (
    <TableRow hover>
      <TableCell sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}>
        {item.id}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {item.typeOperation.name}
      </TableCell>
      <TableCell>
        {item.origin.id} - {item.origin.name}
      </TableCell>
      <TableCell>
        {item.destiny.id} - {item.destiny.name}
      </TableCell>
      <TableCell>
        R${" "}
        {valueTotal(
          item.value10,
          item.value20,
          item.value50,
          item.value100
        ).toFixed(2)}
      </TableCell>
      <TableCell sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}>
        STATUS
      </TableCell>
      <TableCell>ALT. COMP.</TableCell>
      <TableCell>{item.obs}</TableCell>
      <TableCell>
        <TableCell sx={{ width: { xs: 50, md: 130 } }}>
          <Button size="small" onClick={() => onEdit(item)}>
            <Edit />
          </Button>
          <Button size="small" onClick={() => onDelete(item)}>
            <Delete />
          </Button>
        </TableCell>
      </TableCell>
    </TableRow>
  );
};
