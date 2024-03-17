import React, {memo} from 'react';
import {Box, Button, Collapse, IconButton, Stack, TextField} from "@mui/material";
import {FieldErrors, useForm} from "react-hook-form";
import BrandService from "../../service/brand-service";
import {Alert} from "@mui/lab";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {IFormCreateModel} from "../CreateModel/CreateModel";

export interface IFormCreteBrand {
  name: string,
}

export interface CreateBrandProps {
  close?: () => void;
}

function CreateBrand({close}: CreateBrandProps) {
  const {register, handleSubmit, setValue} = useForm<IFormCreteBrand>();
  const [open, setOpen]
    = React.useState<null | { severity: 'success' | 'error' | 'warning', text: string }>(null);

  function onSubmit(date: IFormCreteBrand, event: any) {
    event.preventDefault();
    console.log(event);
    if (date.name) {
      setOpen(null);
      BrandService.create(date).then(value => {
        setValue("name", "");
        console.log(value);
        setOpen({severity: 'success', text: 'Успішно додано'})
      }).catch(reason => {
        setOpen({severity: 'error', text: 'Помилка при додаванні. Можливо бренд вже існує!'})
      });
    } else {
      setOpen({severity: 'warning', text: 'Поле пусте.'})
    }
  }

  function onValidation(errors: FieldErrors<IFormCreateModel>) {
    setOpen({severity: 'warning', text: 'Помилка валідності поля!'})
  }


  return (
    <Box maxWidth={600} width={'100%'} mx={'auto'}>
      <form onSubmit={handleSubmit(onSubmit, onValidation)} >
        <Stack gap={2} mx={'auto'}>
          <TextField id='car-brand' placeholder='Назва бренду'  {...register("name", {required: true})}/>
          <Button variant='contained' type='submit'>Додати</Button>
        </Stack>
      </form>
      <Box p={2}></Box>
      {!!open && <Collapse in={!!open}>
        <Alert
          severity={open.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(null);
              }}
            >
              <CloseIcon fontSize="inherit"/>
            </IconButton>
          }
          sx={{mb: 2}}
        >
          {open.text}
        </Alert>
      </Collapse>
      }

    </Box>
  );
}

export default memo(CreateBrand);
