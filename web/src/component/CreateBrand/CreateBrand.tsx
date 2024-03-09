import React from 'react';
import {Box, Button, Stack, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import BrandService from "../../service/brand-service";

export interface IFormCreteBrand {
  name: string
}

function CreateBrand() {
  const {register, handleSubmit, setValue} = useForm<IFormCreteBrand>()

  function onSubmit(date: IFormCreteBrand) {
    if (date.name)
      BrandService.create(date);
  }

  return (
    <Box maxWidth={600} mx={'auto'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mx={'auto'}>
          <TextField placeholder='Назва бренду'  {...register("name", {required: true})}/>
          <Button variant='contained' type='submit'>Додати</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default CreateBrand;