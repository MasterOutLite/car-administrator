import React, {useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Autocomplete,
  Box,
  Button, Divider,
  IconButton,
  Paper, Stack,
  TextField,
  Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CreateCarModificationType} from "../../type/car-modification";
import DeleteIcon from '@mui/icons-material/Delete';
import {wheelDriveItems} from "../../const/wheel-drive";
import {typeTransmissionItems} from "../../const/type-transmission";

export interface CreateCarModificationProps {
  setValue?: (value: CreateCarModificationType[]) => void;
  removeItems?: string;
}

function CreateCarModification({setValue, removeItems}: CreateCarModificationProps) {
  const [modification, setModification] = useState<CreateCarModificationType[]>([])

  const [name, setName] = useState<string>('');
  const [powerEngin, setPowerEngin] = useState<string>('');
  const [typeTransmission, setTypeTransmission] = useState<string>('');
  const [wheelDrive, setWheelDrive] = useState<string>('');

  const handleChangeName = (event: any) => setName(event.target.value);
  const handleChangePowerEngin = (event: any) => setPowerEngin(event.target.value);
  const handleChangeTypeTransmission = (event: any, value: string | null) => setTypeTransmission(value || '');
  const handleChangeWheelDrive = (event: any, value: string | null) => setWheelDrive(value || '');

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

  useEffect(() => {
    if (removeItems) {
      handleRemoveModification(removeItems)
      console.log("remove");
    }
    console.log(removeItems);
  }, [removeItems]);

  return (
    <Box>
      <Typography variant='h6' margin={1}>Модифікації автомобіля</Typography>
      <Grid2 container spacing={1} pb={1}>
        <Grid2 xs={12} md={3}>
          <TextField id='modification-name' value={name} onChange={handleChangeName} fullWidth
                     placeholder='Модифікація'/>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <TextField id='modification-power-engine' value={powerEngin}
                     type='number'
                     onChange={handleChangePowerEngin} fullWidth
                     placeholder='Потужність двигуна'/>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={typeTransmissionItems}
            onChange={handleChangeTypeTransmission}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Трансмісія"/>}
          />
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={wheelDriveItems}
            onChange={handleChangeWheelDrive}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Привід"/>}
          />
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
          <Stack divider={<Divider/>} gap={1}>
            <Paper elevation={2}>
              <Grid2 container spacing={1}>
                <Grid2 xs={12} md={3}>
                  <Typography p={1}>
                    Назва
                  </Typography>
                </Grid2>

                <Grid2 xs={12} md={3}>
                  <Typography p={1}>
                    Потужність (к.с)
                  </Typography>
                </Grid2>
                <Grid2 xs={12} md={3}>
                  <Typography p={1}>
                    Коробка передач
                  </Typography>
                </Grid2>
                <Grid2 xs={12} md={3}>
                  <Typography p={1}>
                    Привід
                  </Typography>
                </Grid2>
              </Grid2>
            </Paper>
            {
              modification.map(value => (
                <Paper key={value.name} elevation={2}>
                  <Grid2 key={value.name} container spacing={1}>
                    <Grid2 xs={12} md={3}>
                      <Typography p={1}>
                        {value.name}
                      </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={3}>
                      <Typography p={1}>
                        {value.powerEngin} к.с
                      </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={3}>
                      <Typography p={1}>
                        {value.typeTransmission}
                      </Typography>
                    </Grid2>

                    <Grid2 xs={10} md={3}>
                      <Stack direction='row'>
                        <Typography flexGrow={1} p={1}>
                          {value.wheelDrive}
                        </Typography>
                        <IconButton onClick={handleRemoveModification(value.name)}>
                          <DeleteIcon/>
                        </IconButton>
                      </Stack>
                    </Grid2>
                  </Grid2>
                </Paper>
              ))
            }
          </Stack>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}

export default CreateCarModification;
