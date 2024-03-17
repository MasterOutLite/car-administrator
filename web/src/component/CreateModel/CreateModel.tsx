import React, {memo} from 'react';
import {Box, Button, Stack, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import ModelService from "../../service/model-service";

export interface IFormCreateModel {
  name: string
}

function CreateModel() {

  const {register, handleSubmit, setValue} = useForm<IFormCreateModel>()

  function onSubmit(date: IFormCreateModel) {
    if (date.name)
      ModelService.create(date).then(value => {
        setValue('name', '');
        console.log(value);
      });
  }

  return (
    <Box maxWidth={600} mx={'auto'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mx={'auto'}>
          <TextField id='car-model' placeholder='Назва моделі'  {...register("name", {required: true})}/>
          <Button variant='contained' type='submit'>Додати</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default memo(CreateModel);
