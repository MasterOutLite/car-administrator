import React, {useEffect, useState} from 'react';
import {CarType, EditCarType} from "../../type/car-type";
import CarService from "../../service/car-service";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Paper, Stack, TextField} from "@mui/material";
import LoadPicture from "../UploadFile/LoadPicture";
import {DatePicker} from "@mui/x-date-pickers";
import ListBrand from "../ListBrand/ListBrand";
import ListTypeModel from "../ListTypeModel/ListTypeModel";
import LoadArrPictures from "../UploadFile/LoadArrPictures";
import dayjs from "dayjs";
import EditCarModification from "../EditCarModification/EditCarModification";
import EditCarModificationList from "../EditCarModificationList/EditCarModificationList";
import {Route} from "../../router";


function EditCar() {
  const param = useParams() as { id: string };
  const navigate = useNavigate();

  const [car, setCar] = useState<EditCarType>({});
  const [oldCar, setOldCar] = useState<CarType>();

  const [icon, setIcon] = useState<File | null>(null);
  const [img, setImg] = useState<File[]>([]);

  useEffect(() => {
    CarService.getCar(param.id).then(value => {
      setOldCar(value);
    })
  }, []);

  if (!car || !oldCar)
    return null;

  function setLoadFile(file: File | null) {
    setIcon(file);
    car.icon = file;
    setCar(car);
  }

  function setLoadFileArr(file: File[]) {
    setImg(file);
    car.img = file;
    setCar(car);
  }

  function eventRemoveFile(file: any) {
    if (!car)
      return;
    console.log(file.src)
    if (!car.removeImg)
      car.removeImg = [];
    car.removeImg.push(file.src);
    setCar(car);
  }

  function handleChangeDate(value: any) {
    if (!car)
      return;
    const parseDate = Date.parse(value);
    const date = new Date(parseDate);
    setCar({...car, yearRelease: date.toUTCString()})
  }

  function handleSetBrandId(val: number | undefined | null) {
    if (!car)
      return;

    setCar({...car, markId: val || 0})
  }

  function handleSetModelId(val: number | undefined | null) {
    if (!car)
      return;

    setCar({...car, modelId: val || 0})
  }

  function editDataCar() {
    const form = new FormData();
    if (!car || !oldCar) {
      console.log('editDataCar', "exit")
      return;
    }
    let isEdit = false;
    if (car.name && car.name != oldCar.name) {
      form.append('name', car.name);
      isEdit = true;
    }
    if (car.description && car.description != oldCar.description) {
      form.append('description', car.description);
      isEdit = true;
    }
    if (car.markId && car.markId != oldCar.markId) {
      form.append("markId", car.markId.toString());
      isEdit = true;
    }
    if (car.modelId && car.modelId != oldCar.modelId) {
      form.append('modelId', car.modelId.toString());
      isEdit = true;
    }
    if (car.yearRelease && car.yearRelease != oldCar.yearRelease) {
      form.append('yearRelease', car.yearRelease);
      isEdit = true;
    }

    if (car.icon) {
      form.append('icon', car.icon, car.name);
      isEdit = true;
    }
    if (car.img) {
      car.img.forEach(value => {
        form.append('img', value, value.name);
      });
      isEdit = true;
    }

    if (car.removeImg) {
      car.removeImg.forEach(value => {
        form.append('removeImg', value);
      });
      isEdit = true;
    }

    if (isEdit) {
      console.log("Send put");
      CarService.editCar(oldCar.id, form)
        .then(value => {
          console.log(value);
        })
        .catch(reason => {
          console.log(reason);
        });
    }

    console.log(car);
  }

  function handleDeleteCar() {
    if (!oldCar)
      return;
    CarService.deleteCar(oldCar.id)
      .then(value => {
        navigate(Route.Main);
      })
      .catch();
  }


  return (
    <Box pb={6} pt={2}>
      <Stack direction='row' gap={2} justifyContent='flex-end' p={3}>
        <Button variant='contained' color='error' onClick={handleDeleteCar}>Видалити автомобіль</Button>
        <Button variant='contained' color='success' onClick={editDataCar}>Змінити дані</Button>
      </Stack>
      <Stack
        direction={{xs: 'column', sm: 'row'}}
        gap={2} pb={2}>
        <LoadPicture initPicture={oldCar.icon} setLoadFile={setLoadFile}/>
        <Stack flexGrow={1} gap={2}>
          <TextField placeholder='Назва автомобіля'
                     defaultValue={oldCar.name}
                     onChange={event => {
                       car.name = event.target.value;
                       setCar(car)
                     }}/>
          <TextField placeholder='Опис автомобіля' multiline rows={10}
                     defaultValue={oldCar.description}
                     onChange={event => {
                       car.description = event.target.value
                       setCar(car)
                     }}/>
          <DatePicker onChange={handleChangeDate} value={dayjs(oldCar.yearRelease)}/>

          <ListBrand init={oldCar.markId} setValue={handleSetBrandId} showAdd/>
          <ListTypeModel init={oldCar.modelId} setValue={handleSetModelId} showAdd/>
        </Stack>
      </Stack>
      {/*<CreateCarModification setValue={setModification}/>*/}

      <EditCarModificationList modifications={oldCar.carModification || []} carId={oldCar.id}/>
      <Paper sx={{mt: 2, p:1}} elevation={4}>
        <LoadArrPictures eventRemove={eventRemoveFile} initPictures={oldCar.img} setLoadFile={setLoadFileArr}/>
      </Paper>
    </Box>
  );
}

export default EditCar;
