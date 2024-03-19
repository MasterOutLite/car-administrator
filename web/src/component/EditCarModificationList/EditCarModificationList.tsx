import React, {useState} from 'react';
import {CarModification, CreateCarModificationType} from "../../type/car-modification";
import {Box, Button, Stack} from "@mui/material";
import CreateCarModification from "../CreateCarModification/CreateCarModification";
import EditCarModification from "../EditCarModification/EditCarModification";
import CarModificationService from "../../service/car-modification-service";

export interface EditCarModificationListProps {
  modifications: CarModification[];
  carId: number;
}

function EditCarModificationList({modifications, carId}: EditCarModificationListProps) {
  const [carModifications, setCarModifications]
    = useState<CarModification[]>(modifications)
  const [createModification, setCreateModification]
    = useState<CreateCarModificationType[]>([]);
  const [removeModif, setRemoveModif] = useState<string>('')

  function addModification() {
    createModification.forEach(value => {
      CarModificationService
        .createCarModification({...value, carId})
        .then(res => {
          setCarModifications(prevState => [...prevState, res]);
          setRemoveModif(res.name);
        })
        .catch(reason => console.log(reason));
    })
  }

  function deleteModification(id: number) {
    return () => {
      const newModification = carModifications.filter(value => value.id != id);
      setCarModifications(newModification);
    }
  }

  return (
    <Stack gap={1}>
      <CreateCarModification removeItems={removeModif} setValue={setCreateModification}/>
      <Button sx={{alignSelf: 'flex-end'}} variant='contained' onClick={addModification}
              color='success'>Зберегти</Button>
      {
        carModifications.map(value => (
          <EditCarModification key={value.id} eventDelete={deleteModification(value.id)} modification={value}/>
        ))
      }
    </Stack>
  );
}

export default EditCarModificationList;
