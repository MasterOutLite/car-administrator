import React, {memo, useState} from 'react';
import {useForm} from "react-hook-form";
import {Alert, Box, Button, Collapse, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import LoadPicture from "../UploadFile/LoadPicture";
import LoadArrPictures from "../UploadFile/LoadArrPictures";
import ListBrand from "../ListBrand/ListBrand";
import ListTypeModel from "../ListTypeModel/ListTypeModel";
import CarService from "../../service/car-service";
import CreateCarModification from "../CreateCarModification/CreateCarModification";
import {CreateCarModificationType} from "../../type/car-modification";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";
import {Route} from "../../router";

export interface IFormCreateCar {
  name: string,
  description: string,
  yearRelease: Date,
  img: File[] | null,
  icon: File | null,
  markId: number,
  modelId: number,
  modification?: CreateCarModificationType[],
}

function CreateCar() {
  const navigate = useNavigate();
  const {register, reset, handleSubmit, setValue} = useForm<IFormCreateCar>()
  const [modification, setModification] = useState<CreateCarModificationType[]>([])
  const [message, setMessage]
    = React.useState<null | { severity: 'success' | 'error' | 'warning', text: string }>(null);

  function onSubmit(date: IFormCreateCar) {
    if (!date.icon || !date.img)
      return;
    if (!date.yearRelease || date.markId <= 0 || date.modelId <= 0)
      return;

    const form = new FormData();
    form.append('name', date.name);
    form.append('description', date.description);
    form.append('yearRelease', date.yearRelease.getFullYear().toString());
    form.append('icon', date.icon, date.icon.name);
    date.img.forEach(value => {
      form.append('img', value, value.name);
    })
    form.append('modelId', date.modelId.toString());
    form.append('markId', date.markId.toString());
    modification.forEach(value => {

    });
    form.append('modification', JSON.stringify(modification))
    CarService
      .createCarWithModification(form)
      .then(() => {
        setMessage({severity: 'success', text: 'Успішно створено.'})
        eventReset();
      })
      .catch(() => {
        setMessage({severity: 'error', text: 'Помилка створення.'})
      });

    console.log("Success", date, form);
  }

  function eventReset() {
    navigate(Route.Admin);
  }

  function setLoadFile(file: File | null) {
    setValue('icon', file);
  }

  function setLoadFileArr(file: File[]) {
    setValue('img', file);
  }

  function handleChangeDate(value: any) {
    const parseDate = Date.parse(value);
    const date = new Date(parseDate);
    setValue('yearRelease', date);
  }

  function handleSetBrandId(val: number | undefined | null) {
    setValue('markId', val ? val : 0);
  }

  function handleSetModelId(val: number | undefined | null) {
    setValue('modelId', val ? val : 0);
  }

  return (
    <Box pb={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} pb={3}>
          <Button variant='contained' type='submit'>Додати автомобіль</Button>
          {!!message && <Collapse in={!!message}>
            <Alert
              severity={message.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setMessage(null);
                  }}
                >
                  <CloseIcon fontSize="inherit"/>
                </IconButton>
              }
              sx={{mb: 2}}
            >
              {message.text}
            </Alert>
          </Collapse>
          }
        </Stack>
        <Stack
          direction={{xs: 'column', sm: 'row'}}
          gap={2} pb={2}>
          <Box>
            <Typography variant='h6' textAlign='center'>Іконка</Typography>
            <LoadPicture setLoadFile={setLoadFile}/>
          </Box>
          <Stack flexGrow={1} gap={2}>
            <Box>
              <Typography variant='h6'>Назва</Typography>
              <TextField placeholder='Назва автомобіля' fullWidth  {...register("name", {required: true})}/>
            </Box>

            <Box>
              <Typography variant='h6'>Опис</Typography>
              <TextField placeholder='Опис автомобіля' multiline rows={10}
                         fullWidth
                         {...register("description", {required: true})}/>
            </Box>

            <Box>
              <Typography variant='h6'>Дата випуску</Typography>
              <DatePicker sx={{width: '100%'}} onChange={handleChangeDate}/>
            </Box>

            <ListBrand setValue={handleSetBrandId} showAdd/>
            <ListTypeModel setValue={handleSetModelId} showAdd/>
          </Stack>
        </Stack>
        <Box height={2} my={2} sx={{background: '#000'}}/>
        <CreateCarModification setValue={setModification}/>
        <Box height={2} my={2} sx={{background: '#000'}}/>
        <Typography variant='h6'>Зображення автомобіля</Typography>
        <Paper sx={{mt: 2}} elevation={4}>
          <LoadArrPictures setLoadFile={setLoadFileArr}/>
        </Paper>

      </form>
    </Box>
  );
}

export default memo(CreateCar);
