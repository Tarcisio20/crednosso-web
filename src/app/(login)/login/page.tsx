"use client";
import { useState, FormEvent } from 'react'
import { Alert, Box, Button, TextField, Typography, Link as MUILink } from "@mui/material";
import Link from "next/link";
import { api } from '@/libs/api';

const Page = () => {

    const [userField, setUserField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmitLogin = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!userField || !passwordField){
            setError('Preencha usuario ou senha!')
            return;
        }

        setError('')
        setLoading(true)
        const result = await api.login(userField, passwordField) 
        if(result.error){
            setError(result.error)
        }
        setLoading(false)
    }

    return(
        <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555' }} >Faça login para acesso ao sistema CredNosso.</Typography>

            <Box component='form' onSubmit={handleSubmitLogin} sx={{ mt: 3 }} >
                <TextField
                    label="Digite o usuario"
                    name="user"
                    required
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    value={userField}
                    onChange={e => setUserField(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    label="Digite a senha"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    value={passwordField}
                    onChange={e => setPasswordField(e.target.value)}
                    disabled={loading}
                />
                <Button type="submit" variant="contained" fullWidth disabled={loading} >Acessar</Button>
                {error && 
                    <Alert variant='filled' severity='error' sx={{ mt: 3 }} >{error}</Alert>
                }

                <Box sx={{ mt: 3 }}>
                    <MUILink href="/login/forgot" variant="body2" component={Link}>Esqueceu a senha? </MUILink>
                </Box>
            </Box>
        </>
    )
}

export default Page