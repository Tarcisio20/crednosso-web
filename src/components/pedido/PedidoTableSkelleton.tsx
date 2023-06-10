import { TableCell, TableRow, Skeleton } from "@mui/material";

export const PedidoTableSkelleton = () => {
  return (
    <TableRow>
      <TableCell sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell sx={{ width: { xs: 50, md: 130 } }}>
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );
};
