import { Box, Drawer, Divider, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import Link from "next/link";

type Props = {
    open : boolean;
    onClose : ()=> void;
    onLogout : () => void;
    title: string;
}

export const HeaderDrawer = ({ open, onClose, onLogout, title } : Props) => {
    return(
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted : true }}
            sx={{ display : { xs : 'block', sm  : 'none' }, '$ .MuiDrawer-paper' : { width : '70%' } }}
        >
            <Box sx={{ textAlign : 'center' }} >
                <Typography variant="h6" sx={{ my : 2 }}>{title}</Typography>
                <Divider />
                <List>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <Link href="/transportadora" style={{ color : '#000', textDecoration : 'none' }}>
                                <ListItemText primary="Transportadora" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <Link href="/atm" style={{ color : '#000', textDecoration : 'none' }}>
                                <ListItemText primary="ATM" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <Link href="/abastecimento" style={{ color : '#000', textDecoration : 'none' }}>
                                <ListItemText primary="Abastecimento" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <Link href="/tesouraria" style={{ color : '#000', textDecoration : 'none' }}>
                                <ListItemText primary="Tesouraria" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                     <ListItem disablePadding >
                        <ListItemButton onClick={onLogout}>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}