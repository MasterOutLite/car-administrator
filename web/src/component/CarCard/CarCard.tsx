import {Badge, Box, Link, Stack, Typography} from '@mui/material';
import React from 'react';
import {CarType} from "../../type/car-type";

export interface CarCardProps {
  car: CarType;

}

function CarCard({car}: CarCardProps) {
  const date = new Date(car.yearRelease);
  return (
    <Box>
      <Stack alignItems={'center'} justifyContent={'center'} height={250} margin={'0 auto'}>
        <img style={{maxHeight: '100%', maxWidth: '100%'}} src={car.icon} alt={car.name}/>
      </Stack>

      <Box textAlign={'center'}>
        <Badge badgeContent={date.getFullYear()} max={9999}>
          <Link href="#" underline="hover">{car.name}</Link>
        </Badge>
      </Box>
    </Box>
  );
}

export default CarCard;
