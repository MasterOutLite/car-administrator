import React, {useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {CarType} from "../../type/car-type";
import CarService from "../../service/car-service";
import CarCard from "../CarCard/CarCard";
import {useCarFilterStore} from "../../store/useCarFilterStore";


export interface RenderCarCardProps {

}

function RenderCarCard({}: RenderCarCardProps) {


  const {car, init} = useCarFilterStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <Grid2 container spacing={2}>
      {
        car.map(value => (
          <Grid2 key={value.name} xs={12} sm={6} md={3} lg={2}>
            <CarCard car={value}/>
          </Grid2>
        ))
      }

    </Grid2>
  );
}

export default RenderCarCard;
