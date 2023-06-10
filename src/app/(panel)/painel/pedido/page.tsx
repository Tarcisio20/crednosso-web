"use client";

import { PedidoEditDialog } from "@/components/Pedido/PedidoEditDialog";
import { api } from "@/libs/api";
import { OperationType } from "@/types/OperationType";
import { PedidoType } from "@/types/PedidoType";
import { TransportadoraType } from "@/types/TransportadoraType";
import { TypesPedidoType } from "@/types/TypesPedidoType";
import { Add, Search, SearchOffTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
} from "@mui/material";
import { useEffect, useState, FormEvent } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ButtonComponent } from "@/components/ButtonComponent";
import { PedidoTableSkelleton } from '@/components/Pedido/PedidoTableSkelleton'
import { PedidoTableItem } from "@/components/Pedido/PedidoTableItem";

dayjs.locale("pt-br");

const Page = () => {
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const [transportadoras, setTransportadoras] = useState<TransportadoraType[]>(
    []
  );

  const [pedidoToEdit, setPedidoToEdit] = useState<PedidoType>();
  const [operations, setOperations] = useState<OperationType[]>([]);
  const [types, setTypes] = useState<TypesPedidoType[]>([]);
  const [loading, setLoading] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loadingEditDialog, setLoadingEditDialog] = useState(false);

  const [dateInitial, setDateInitial] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [dateFinal, setDateFinal] = useState<Dayjs | null>(dayjs(new Date()));

  const [pedidoToDelete, setPedidoToDelete] = useState<PedidoType>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const [PedidosClone, setPedidosClone] = useState<PedidoType[]>([]);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    setLoading(true);
    setPedidos(await api.getPedidos());
    setTransportadoras(await api.getTransportadoras());
    setOperations(await api.getOperations());
    setTypes(await api.getTypes());
    setLoading(false);
  };

  const handleOnEdit = (pedido: PedidoType) => {
    setPedidoToEdit(pedido);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (pedidoToDelete) {
      setLoadingDelete(true);
      await api.deletePedido(pedidoToDelete.id);
      setLoadingDelete(false);
      setShowDeleteDialog(false);
      getPedidos();
    }
  };

  const handleOnDelete = (pedido: PedidoType) => {
    setPedidoToDelete(pedido);
    setShowDeleteDialog(true);
  };

  const handleNewPedido = () => {
    setPedidoToEdit(undefined);
    setEditDialogOpen(true);
  };

  const handleSaveEditDialog = async (event: FormEvent<HTMLFormElement>) => {
    let form = new FormData(event.currentTarget);

    setLoadingEditDialog(true);
    if (pedidoToEdit) {
      form.append("id", pedidoToEdit.id.toString());
      await api.upgradePedido(form);
    } else {
      await api.createPedido(form);
    }
  };

  const handleFormSearchSubmit = async () => {
    setShowSearchDialog(true);
    setPedidosClone(await api.searchFilters(dayjs(dateInitial), dayjs(dateFinal)));
    setShowSearchDialog(false);
  };

  const handleConfirmPartial = () => {};

  return (
    <Box sx={{ my: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Typography component="h5" variant="h5">
          PEDIDOS |{" "}
          <span style={{ color: "#DDD", fontWeight: "bold" }}>HOME</span>
        </Typography>
        <Button
          variant="outlined"
          color="success"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={handleNewPedido}
        >
          <Add />
          Adicionar
        </Button>
      </Box>
      <Divider />
      <Box>
        <Typography component="h5" variant="h5">
          FILTROS |{" "}
          <span style={{ color: "#DDD", fontWeight: "bold" }}>PEDIDOS</span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mt: 2,
          }}
        >
          <Box sx={{ mb: 2, width: "30%" }}>
            <DatePicker
              label="Inicial"
              defaultValue={dateInitial}
              onChange={(newValue : Dayjs | null) => setDateInitial(newValue)}
              format="DD/MM/YYYY"
              sx={{}}
            />
          </Box>
          <Box sx={{ mb: 2, width: "30%" }}>
            <DatePicker
              label="Final"
              defaultValue={dateFinal}
              onChange={(newValue : Dayjs  | null) => setDateFinal(newValue)}
              format="DD/MM/YYYY"
              sx={{}}
            />
          </Box>
          <Box sx={{ width: "20%" }}>
            <Button
              sx={{ width: "20%", height: "55px" }}
              variant="outlined"
              color="success"
              onClick={handleFormSearchSubmit}
            >
              <Search />
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography component="h5" variant="h5">
          AÇÕES |{" "}
          <span style={{ color: "#DDD", fontWeight: "bold" }}>PEDIDOS</span>
        </Typography>
        <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 2 }}>
          <ButtonComponent
            variant="outlined"
            color="success"
            onClick={handleConfirmPartial}
          >
            Confirmar Parcial
          </ButtonComponent>

          <ButtonComponent
            variant="outlined"
            color="success"
            onClick={handleConfirmPartial}
          >
            Confirmar Total
          </ButtonComponent>

          <ButtonComponent
            variant="outlined"
            color="success"
            onClick={handleConfirmPartial}
          >
            Alterar Data
          </ButtonComponent>
        </Box>
      </Box>
      <Divider />
      <Table sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
            >
              ID
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              T. OPERAÇÃO
            </TableCell>
            <TableCell>ORIGEM</TableCell>
            <TableCell>DESTINO</TableCell>
            <TableCell>VL SOLICITADO</TableCell>
            <TableCell
              sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
            >
              STATUS
            </TableCell>
            <TableCell>ALT. COMP.</TableCell>
            <TableCell>OBS</TableCell>
            <TableCell sx={{ width: { xs: 50, md: 130 } }}>AÇÕES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <>
              <PedidoTableSkelleton />
              <PedidoTableSkelleton />
              <PedidoTableSkelleton />
              <PedidoTableSkelleton />
              <PedidoTableSkelleton />
            </>
          )}
          {!loading &&
            pedidos.map((item) => (
              <PedidoTableItem
                key={item.id}
                item={item}
                onEdit={handleOnEdit}
                onDelete={handleOnDelete}
              />
            ))}
        </TableBody>
      </Table>

      <Dialog
        open={showDeleteDialog}
        onClose={() => (!loadingDelete ? setShowDeleteDialog(false) : null)}
      >
        <DialogTitle>Deseja realmente deletar esse PEDIDO?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esse ato causa um efeito cascata no sistema.
          </DialogContentText>
          <DialogActions>
            <Button
              disabled={loadingDelete}
              onClick={() => setShowDeleteDialog(false)}
            >
              Não
            </Button>
            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>
              Sim
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={showSearchDialog}>
        <DialogTitle>Pesquisando</DialogTitle>
        <DialogContent>
          <SearchOffTwoTone />
        </DialogContent>
      </Dialog>

      <PedidoEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEditDialog}
        disabled={loadingEditDialog}
        pedido={pedidoToEdit}
        operations={operations}
        transportadoras={transportadoras}
        typePedido={types}
      />
    </Box>
  );
};

export default Page;
