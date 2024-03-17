import React, {useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Paper, Stack,
  TextField,
  Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CreateCarModificationType} from "../../type/car-modification";
import DeleteIcon from '@mui/icons-material/Delete';

export interface CreateCarModificationProps {
  setValue?: (value: CreateCarModificationType[]) => void;
}

function CreateCarModification({setValue}: CreateCarModificationProps) {
  const [modification, setModification] = useState<CreateCarModificationType[]>([])

  const [name, setName] = useState<string>('');
  const [powerEngin, setPowerEngin] = useState<string>('');
  const [typeTransmission, setTypeTransmission] = useState<string>('');
  const [wheelDrive, setWheelDrive] = useState<string>('');

  const handleChangeName = (event: any) => setName(event.target.value);
  const handleChangePowerEngin = (event: any) => setPowerEngin(event.target.value);
  const handleChangeTypeTransmission = (event: any) => setTypeTransmission(event.target.value);
  const handleChangeWheelDrive = (event: any) => setWheelDrive(event.target.value);

  function handleAddModification() {

    if (!name || !typeTransmission || !powerEngin || !wheelDrive)
      return;

    const exist = modification.find(value => value.name == name);

    if (exist) {
      console.log("Modification is exist:", exist);
      return;
    }

    setModification(prevState => [...prevState, {name, powerEngin, typeTransmission, wheelDrive}])
  }

  function handleRemoveModification(name: string) {
    return () => {
      const newModification = modification.filter(value => value.name != name);
      setModification(newModification);
    }
  }

  useEffect(() => {
    if (setValue)
      setValue(modification);
  }, [modification, setValue]);

  return (
    <Box>
      <Typography variant='h6' margin={1}>Модифікації автомобіля</Typography>
      <Grid2 container spacing={1} pb={1}>
        <Grid2 xs={12} md={3}>
          <TextField id='modification-name' value={name} onChange={handleChangeName} fullWidth
                     placeholder='Модифікація'/>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <TextField id='modification-power-engine' value={powerEngin} onChange={handleChangePowerEngin} fullWidth
                     placeholder='Потужність двигуна'/>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <TextField id='modification-type-transmision' value={typeTransmission} onChange={handleChangeTypeTransmission}
                     fullWidth
                     placeholder='Тип трансмісії'/>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <TextField id='modification-wheel-drive' value={wheelDrive} onChange={handleChangeWheelDrive} fullWidth
                     placeholder='Тип приводу'/>
        </Grid2>

        <Grid2 mt={1} ml={'auto'}>
          <Button onClick={handleAddModification} variant='contained'>Додати</Button>
        </Grid2>
      </Grid2>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="car-modification-list"
          id="car-modification-list"
        >
          Модифікації автомобіля
        </AccordionSummary>
        <AccordionDetails>
          {
            modification.map(value => (
              <Grid2 key={value.name} container spacing={1}>
                <Grid2 xs={12} md={3}>
                  <Paper sx={{p: 1}}>
                    <Typography>
                      {value.name}
                    </Typography>
                  </Paper>
                </Grid2>

                <Grid2 xs={12} md={3}>
                  <Paper sx={{p: 1}}>
                    <Typography>
                      {value.powerEngin}
                    </Typography>
                  </Paper>
                </Grid2>

                <Grid2 xs={12} md={3}>
                  <Paper sx={{p: 1}}>
                    <Typography>
                      {value.typeTransmission}
                    </Typography>
                  </Paper>
                </Grid2>

                <Grid2 xs={10} md={3}>
                  <Stack direction='row'>
                    <Paper sx={{p: 1, flexGrow: 1}}>
                      <Typography>
                        {value.wheelDrive}
                      </Typography>
                    </Paper>
                    <IconButton onClick={handleRemoveModification(value.name)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Stack>
                </Grid2>

              </Grid2>
            ))
          }


        </AccordionDetails>
      </Accordion>

    </Box>
  );
}

export default CreateCarModification;
