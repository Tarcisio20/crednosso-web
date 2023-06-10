import { useState } from 'react'
import { Menu } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HeaderDrawer } from "./HeaderDrawer"

export const Header = () => {

    const router = useRouter()

    const [drawerOpen, setDrawerOpen] = useState(false);

    const titlePage = 'CredNosso'

    const handleLogout = () => {
        router.push('/login')
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    return(
        <>
            <AppBar component="nav" position="relative">
                <Toolbar>
                    <IconButton color="inherit" edge="start" sx={{ display : { sm : 'none' } }} onClick={handleDrawerToggle} >
                        <Menu />
                    </IconButton>
                    <Typography component="div" variant="h6" sx={{ flexGrow : 1, display : { sx : 'none', sm : 'block' } }}>
                        <Link href="/" style={{ color : '#FFF', textDecoration : 'none' }}>
                            {titlePage}
                        </Link>
                    </Typography>
                    <Box sx={{ display : { xs : 'none', sm : 'block' } }}>
                        <Link href="/painel/transportadora" style={{ textDecoration : 'none' }} >
                            <Button sx={{ color: '#EEE' }} >Transportadora</Button>
                        </Link>  
                        <Link href="/painel/atm" style={{ textDecoration : 'none' }} >
                            <Button sx={{ color: '#EEE' }} >ATM</Button>
                        </Link>
                        <Link href="/painel/abastecimento" style={{ textDecoration : 'none' }} >
                            <Button sx={{ color: '#EEE' }} >Abastecimento</Button>
                        </Link> 
                        <Link href="/painel/tesouraria" style={{ textDecoration : 'none' }} >
                            <Button sx={{ color: '#EEE' }} >Tesouraria</Button>
                        </Link>
                        <Link href="/painel/pedido" style={{ textDecoration : 'none' }} >
                            <Button sx={{ color: '#EEE' }} >Pedido</Button>
                        </Link>
                        <Link href="/painel/admin" style={{ textDecoration : 'none' }} >
                            <Button sx={{ color: '#EEE' }} >Admin</Button>
                        </Link>  
                        <Button sx={{ color: '#EEE' }} onClick={handleLogout} >Sair</Button>  
                    </Box>     
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <HeaderDrawer
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    title={titlePage}
                    onLogout={handleLogout}
                />
            </Box>
        </>
    )
}