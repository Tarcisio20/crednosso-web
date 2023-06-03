"use client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import { Header } from '@/components/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs  } from '@mui/x-date-pickers/AdapterDayjs'


type Props = {
    children : React.ReactNode
}

const Layout = ({ children } : Props) => {
    return(
        <html lang="pt-br">
            <body style={{ margin : 0, padding : 0 }}>
                <Header />
                <Container component="main" maxWidth="lg">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        {children}
                    </LocalizationProvider>
                </Container>
            </body>
        </html>
    )
}

export default Layout   