import React, {useState} from 'react';
import {CarModification} from "../../type/car-modification";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {typeTransmissionItems} from "../../const/type-transmission";
import {wheelDriveItems} from "../../const/wheel-drive";
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CarModificationService from "../../service/car-modification-service";

export interface EditCarModificationProps {
  modification: CarModification;
  eventDelete?: () => void;
}

function EditCarModification({modification, eventDelete}: EditCarModificationProps) {
  console.log(modification.id)
  const [carModification, setCarModification]
    = useState<CarModification>(modification);

  const [name, setName] = useState<string>(carModification.name);
  const [powerEngin, setPowerEngin] = useState<string>(carModification.powerEngin);
  const [typeTransmission, setTypeTransmission] = useState<string>(carModification.typeTransmission);
  const [wheelDrive, setWheelDrive] = useState<string>(carModification.wheelDrive);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleChangeName = (event: any) => {
    const value = event.target.value;
    setName(value);
    setIsEdit(value != carModification.name)
  };
  const handleChangePowerEngin = (event: any) => {
    const value = event.target.value;
    setPowerEngin(value);
    setIsEdit(value != carModification.powerEngin)
  }
  const handleChangeTypeTransmission = (event: any, value: string | null) => {
    setTypeTransmission(value || '');
    setIsEdit(value != carModification.typeTransmission)
  }
  const handleChangeWheelDrive = (event: any, value: string | null) => {
    setWheelDrive(value || '');
    setIsEdit(value != carModification.wheelDrive)
  }

  function editCarModification() {
    const update: any = {};

    if (name != carModification.name)
      update.name = name;
    if (powerEngin != carModification.powerEngin)
      update.powerEngin = powerEngin;
    if (typeTransmission != carModification.typeTransmission)
      update.typeTransmission = typeTransmission;
    if (wheelDrive != carModification.wheelDrive)
      update.wheelDrive = wheelDrive;

    if (isEdit) {
      CarModificationService
        .editCarModification(carModification.id, update)
        .then(value => {
          console.log("Res", value);
          setCarModification(value);
          setIsEdit(false);
        })
        .catch(reason => console.log(reason));
      console.log("editCarModification", update);
    }
  }

  function deleteCarModification() {
    CarModificationService
      .deleteCarModification(carModification.id)
      .then(value => {
        if (eventDelete)
          eventDelete();
      })
      .catch(reason => console.log(reason));
  }

  return (
    <Box>
      <Grid2 container spacing={1} pb={1}>
        <Grid2 xs={12} md={3}>
          <TextField id='modification-name' value={name} onChange={handleChangeName} fullWidth
                     placeholder='Модифікація'/>
        </Grid2>

        <Grid2 xs={12} md={1}>
          <TextField id='modification-power-engine' value={powerEngin}
                     type='number'
                     onChange={handleChangePowerEngin} fullWidth
                     placeholder='Потужність двигуна'/>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Autocomplete
            disablePortal
            value={typeTransmission}
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
            value={wheelDrive}
            id="combo-box-demo"
            options={wheelDriveItems}
            onChange={handleChangeWheelDrive}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Привід"/>}
          />
        </Grid2>

        <Grid2 xs={12} alignSelf='center' display='flex' justifyContent='space-evenly' md={2}>
          <Button onClick={editCarModification} variant='contained' disabled={!isEdit}
                  color='success'>
            <PublishedWithChangesRoundedIcon/>
          </Button>
          <Button onClick={deleteCarModification} variant='contained' color='error'>
            <DeleteIcon/>
          </Button>
        </Grid2>

      </Grid2>
    </Box>
  );
}

export default EditCarModification;
