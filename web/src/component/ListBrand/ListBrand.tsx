import React, {useEffect, useState} from 'react';
import BrandService from "../../service/brand-service";
import {BrandType} from "../../type/brand-type";
import {Autocomplete, Box, Button, Dialog, IconButton, Paper, Stack, SxProps, TextField, Theme} from '@mui/material';
import {useCarFilterStore} from "../../store/useCarFilterStore";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateBrand from "../CreateBrand/CreateBrand";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useBrandStore} from "../../store/useBrandStore";

export interface ListBrandProps {
  setValue?: (val: number | null | undefined) => void;
  sx?: SxProps<Theme>;
  showAdd?: boolean;
  init?: number;
}

function ListBrand({setValue, sx, showAdd, init}: ListBrandProps) {
  const {brands, getBrand} = useBrandStore();
  const [brand, setBrand] =
    useState<BrandType | null>(brands.find(value => value.id === init) || null);
  const [open, setOpen] = useState(false);


  function handleChangeBrand(event: React.SyntheticEvent, value: BrandType | null) {
    setBrand(value);
    if (setValue)
      setValue(value?.id)
    console.log('ListBrand', 'handleChangeBrand', value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <Stack direction='row' alignItems='center'>
      <Autocomplete
        disablePortal
        id="select-brand"
        value={brand}
        options={brands}
        getOptionLabel={option => option.name}
        onChange={handleChangeBrand}
        fullWidth
        sx={sx}
        renderInput={(params) => <TextField {...params} label="Бренд"/>}
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
            <CreateBrand/>
          </Stack>
        </Paper>
      </Dialog>
    </Stack>
  );
}

export default ListBrand;
