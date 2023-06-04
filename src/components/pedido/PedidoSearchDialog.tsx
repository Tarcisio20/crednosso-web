import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent } from "@mui/material";

type Props = {
  open: boolean;
  disabled: boolean;
};

export const PedidoSearchDialog = ({ open, disabled }: Props) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <LoadingButton disabled={disabled}></LoadingButton>
        Aqui esta
      </DialogContent>
    </Dialog>
  );
};
