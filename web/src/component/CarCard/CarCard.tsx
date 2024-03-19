import {Badge, Box, Link, Paper, Stack, Typography} from '@mui/material';
import React from 'react';
import {CarType} from "../../type/car-type";

export interface CarCardProps {
  car: CarType;

}

function CarCard({car}: CarCardProps) {
  const date = new Date(car.yearRelease);
  return (
    <Paper elevation={2} sx={{p: 1}}>
      <Link href={`/${car.id}`}>
        <Stack alignItems={'center'} justifyContent={'center'} height={250} margin={'0 auto'}
               sx={{height: {xs: 300, sm: 250, md: 200, lg: 200}}}
        >
          <img style={{maxHeight: '100%', maxWidth: '100%'}} src={car.icon} alt={car.name}/>
        </Stack>
      </Link>

      <Box textAlign={'center'} pt={2} pr={1}>
        <Badge badgeContent={date.getFullYear()} max={9999}>
          <Link href={`/${car.id}`} mx={2} underline="hover">{car.name}</Link>
        </Badge>
      </Box>

    </Paper>
  );
}

export default CarCard;
