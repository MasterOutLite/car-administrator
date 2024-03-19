import {Autocomplete, Box, Dialog, IconButton, Paper, Stack, SxProps, TextField, Theme} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ModelService from "../../service/model-service";
import {ModelType} from "../../type/model-type";
import {useCarFilterStore} from "../../store/useCarFilterStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CreateBrand from "../CreateBrand/CreateBrand";
import CreateModel from "../CreateModel/CreateModel";
import {useModelStore} from "../../store/useModelStore";


export interface ListTypeModelProps {
  setValue?: (val: number | null | undefined) => void;
  sx?: SxProps<Theme>;
  showAdd?: boolean;
  init?: number;
}

function ListTypeModel({setValue, sx, showAdd, init}: ListTypeModelProps) {
  const {model, getModel} = useModelStore();

  const [typeModel, setTypeModel] =
    useState<ModelType | null>(model.find(value => value.id === init) || null);
  const [open, setOpen] = useState(false);


  function handleChangeModel(event: React.SyntheticEvent, value: ModelType | null) {
    setTypeModel(value);
    if (setValue)
      setValue(value?.id)
    console.log('ListTypeModel', 'handleChangeModel', value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getModel();
  }, []);

  return (
    <Stack direction='row' alignItems='center'>
      <Autocomplete
        disablePortal
        id="select-brand"
        value={typeModel}
        options={model}
        getOptionLabel={option => option.name}
        onChange={handleChangeModel}
        fullWidth={true}
        sx={sx}
        renderInput={(params) => <TextField {...params} label="Тип моделі"/>}
      />

      {
        showAdd && <IconButton onClick={handleOpen}>
          <AddCircleOutlineIcon/>
        </IconButton>
      }


      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{width: {xs: 300, sm: 400}}}>
          <IconButton onClick={handleClose} sx={{ml: 'auto'}}>
            <CloseRoundedIcon/>
          </IconButton>
          <Stack p={2}>
            <CreateModel/>
          </Stack>
        </Paper>
      </Dialog>
    </Stack>
  );
}

export default ListTypeModel;
