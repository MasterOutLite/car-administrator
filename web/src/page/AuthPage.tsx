import React, {useEffect} from 'react';
import {Box, Button, Container, Paper, Stack, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import AuthService from "../service/auth-service";
import {useAuthStore} from "../store/useAuthStore";
import {useNavigate} from "react-router-dom";


export interface IFormLogin {
  login: string,
  password: string
}

function AuthPage() {
  const {register, handleSubmit} = useForm<IFormLogin>();
  const {token} = useAuthStore();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    AuthService.login(data.login, data.password);
  }

  useEffect(() => {
    if (token) {
      console.log(token)
      navigate('/')
    }
  }, [token]);

  return (
    <Container>
      <Box pt={8} sx={{maxWidth: 600}} mx={'auto'}>
        <Paper elevation={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} p={2}>
              <TextField placeholder='Введіть логін' {...register("login", {required: true})}/>
              <TextField placeholder='Введіть пароль'  {...register("password", {required: true})}/>
              <Button variant='contained' type='submit'>Увійти</Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AuthPage;
