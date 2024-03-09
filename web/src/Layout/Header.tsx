import React from 'react';
import {AppBar, Box, Button, IconButton, Link, Stack, Toolbar, Typography} from "@mui/material";
import {useAuthStore} from "../store/useAuthStore";

function Header() {
  const {token, setToken} = useAuthStore();

  function handleLogOut() {
    setToken('');
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>

          <Stack direction='row' flexGrow={1} alignItems='center' gap={2}>
            <Typography component="a" href={'/'} variant="h6" sx={{textDecoration: 'none',}}
                        color={'inherit'}
            >
              Car Administrator
            </Typography>

            <Link component="a" href={'/admin'} color={'inherit'} underline='none'>
              Admin
            </Link>
          </Stack>
          {
            token ?
              <Button onClick={handleLogOut} color="inherit">Вийти</Button>
              :
              <Button href='/auth' color="inherit">Увійти</Button>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
