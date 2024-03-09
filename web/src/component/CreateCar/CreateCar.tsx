import React from 'react';
import {useForm} from "react-hook-form";
import {Box, Button, Paper, Stack, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import LoadPicture from "../UploadFile/LoadPicture";
import LoadArrPictures from "../UploadFile/LoadArrPictures";
import ListBrand from "../ListBrand/ListBrand";
import ListTypeModel from "../ListTypeModel/ListTypeModel";
import CarService from "../../service/car-service";

export interface IFormCreateCar {
  name: string,
  description: string,
  yearRelease: Date,
  img: File[] | null,
  icon: File | null,
  markId: number,
  modelId: number,
}

function CreateCar() {
  const {register, handleSubmit, setValue} = useForm<IFormCreateCar>()

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
    CarService.createCar(form);
    console.log("Success", date);
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
    <Box pb={6} pt={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} p={3}>
          <Button variant='contained' type='submit'>Додати автомобіль</Button>
        </Stack>
        <Stack direction='row' gap={2} pb={2}>
          <LoadPicture setLoadFile={setLoadFile}/>
          <Stack flexGrow={1} gap={2}>
            <TextField placeholder='Назва автомобіля'  {...register("name", {required: true})}/>
            <TextField placeholder='Опис автомобіля' multiline rows={10}
                       {...register("description", {required: true})}/>
            <DatePicker onChange={handleChangeDate}/>

            <ListBrand setValue={handleSetBrandId}/>
            <ListTypeModel setValue={handleSetModelId}/>
          </Stack>
        </Stack>
        <Paper elevation={4}>
          <LoadArrPictures setLoadFile={setLoadFileArr}/>
        </Paper>

      </form>
    </Box>
  );
}

export default CreateCar;
