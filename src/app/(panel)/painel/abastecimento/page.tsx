"use client";

import { Add } from "@mui/icons-material"
import { Box, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

const Page = () => {
    const handleNewAbastecimento = () => {}

    return(
        <Box sx={{ my: 3 }}>
            <Box sx={{ 
                display: 'flex',
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent: 'space-between',
                marginBottom : 2,
                paddingLeft : 10,
                paddingRight : 10
            }}>
            <Typography component="h5" variant="h5"  >
                ABASTECIMENTO | <span style={{ color : '#DDD', fontWeight : 'bold' }} >HOME</span>
            </Typography>
            <Button variant="outlined" color="success" sx={{ display : 'flex', alignItems : 'center' }} onClick={handleNewAbastecimento}>
                <Add /> 
                Adicionar   
            </Button>
            </Box>
            <Divider />
            <Table  sx={{ marginTop : 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width : 50, display : { xs : 'none', md : 'table-cell' } }} >ID</TableCell>
                        <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >NOME</TableCell>
                        <TableCell>REDUZIDO</TableCell>
                        <TableCell sx={{ display : { xs : 'none', md : 'table-cell' } }} >SERIE</TableCell>
                        <TableCell sx={{  width : { xs : 50, md : 130 }}} >AÇÃO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody></TableBody>
            </Table>
        </Box> 
    )
   
    
}

export default Page