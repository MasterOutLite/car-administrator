import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Badge, Box, Breadcrumbs, Container, Link, Paper, Stack, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {CarType} from "../type/car-type";
import CarService from "../service/car-service";
import Grid2 from "@mui/material/Unstable_Grid2";
import {grey} from "@mui/material/colors";

function CarDetailsPage() {
  const param = useParams() as { id: string };

  const [car, setCar] = useState<CarType>();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    CarService.getCar(param.id).then(value => {
      setCar(value)
      setDate(new Date(value.yearRelease));
    })

  }, []);

  if (!car)
    return null;

  return (
    <Container>

      <Stack direction='row' pt={3}>
        <Typography variant={"h4"}>{car.name}</Typography>
        <Typography ml={1} variant={"body1"}>{date.getFullYear()}</Typography>
      </Stack>

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/?brandId=${car.markId}`}
        >
          {car.markId}
        </Link>
        <Typography color="text.primary">{car.name}</Typography>
      </Breadcrumbs>

      <Box py={2}>
        <Carousel autoPlay={false}>
          {
            car.img.map(value => (
              <Stack key={value} alignItems={'center'} justifyContent={'center'} height={350} margin={'0 auto'}
              >
                <img style={{maxHeight: '100%', maxWidth: '100%'}} src={value} alt={`img car ${car.name}`}/>
              </Stack>
            ))
          }
        </Carousel>
      </Box>

      <Paper elevation={3}>
        <Grid2 p={1} container sx={{background: grey[800], color: '#fff'}}>
          <Grid2 xs={6}>
            <Typography>Назва</Typography>
          </Grid2>

          <Grid2 xs={2}>
            <Typography>Потужність двигуна</Typography>
          </Grid2>

          <Grid2 xs={2}>
            <Typography>Коробка передач</Typography>
          </Grid2>

          <Grid2 xs={2}>
            <Typography>Тип трансмісії</Typography>
          </Grid2>
        </Grid2>

        {
          car.carModification?.map(value => (
            <Grid2 p={1} key={value.id} container>
              <Grid2 xs={6}>
                <Typography>{value.name}</Typography>
              </Grid2>

              <Grid2 xs={2}>
                <Typography>{value.powerEngin} л.с</Typography>
              </Grid2>

              <Grid2 xs={2}>
                <Typography>{value.wheelDrive}</Typography>
              </Grid2>

              <Grid2 xs={2}>
                <Typography>{value.typeTransmission}</Typography>
              </Grid2>
            </Grid2>
          ))
        }
      </Paper>

      <Box mt={2} pb={6}>
        <Paper elevation={5}>
          <Typography variant={"h6"} px={1}>
            Опис автомобіля
          </Typography>
          <Typography p={1}>
            {car.description}
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
    ;
}

export default CarDetailsPage;
