import React, {memo} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {FieldErrors, useForm} from "react-hook-form";
import ModelService from "../../service/model-service";
import CloseIcon from "@mui/icons-material/Close";
import {useModelStore} from "../../store/useModelStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

export interface IFormCreateModel {
  name: string
}

function CreateModel() {

  const {register, handleSubmit, setValue} = useForm<IFormCreateModel>()
  const [open, setOpen]
    = React.useState<null | { severity: 'success' | 'error' | 'warning', text: string }>(null);
  const {addModel, model, remove} = useModelStore();

  function onSubmit(date: IFormCreateModel) {
    if (date.name)
      setOpen(null);
    ModelService.create(date)
      .then(value => {
        setValue('name', '');
        console.log(value);
        setOpen({severity: 'success', text: 'Успішно додано'});
        addModel(value);
      })
      .catch(reason => {
        setOpen({severity: 'error', text: 'Помилка при додаванні. Можливо модель вже існує!'})
      });
  }

  function onValidation(errors: FieldErrors<IFormCreateModel>) {
    setOpen({severity: 'warning', text: 'Помилка валідності поля!'})
  }

  function deleteModel(id: number) {
    return () => {
      ModelService
        .delete(id)
        .then(() => {
          remove(id);
          setOpen({severity: 'success', text: 'Успішно видалено.'})
        })
        .catch(
          () => {
            setOpen({severity: 'error', text: 'Помилка при видалені. Можливо ці дані десь використовуються.'})
          }
        );
    }
  }

  return (
    <Box maxWidth={600} width={'100%'} mx={'auto'}>
      <form onSubmit={handleSubmit(onSubmit, onValidation)}>
        <Stack gap={2} mx={'auto'}>
          <TextField id='car-model' placeholder='Назва моделі'  {...register("name", {required: true})}/>
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Бренди
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            {
              model.map((value, index) => (
                <Paper key={value.id}>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' p={1}>
                    <Typography>{value.name}</Typography>
                    <Button onClick={deleteModel(value.id)} variant='contained' color='error'>
                      <DeleteIcon/>
                    </Button>
                  </Stack>
                </Paper>
              ))
            }
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default memo(CreateModel);
