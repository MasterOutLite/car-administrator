import React, {useEffect, useState} from 'react';
import BrandService from "../../service/brand-service";
import {BrandType} from "../../type/brand-type";
import {Autocomplete, Box, SxProps, TextField, Theme} from '@mui/material';
import {useCarFilterStore} from "../../store/useCarFilterStore";

export interface ListBrandProps {
  setValue?: (val: number | null | undefined) => void;
  sx?: SxProps<Theme>;
}

function ListBrand({setValue, sx}: ListBrandProps) {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [brand, setBrand] = useState<BrandType | null>(null);

  function handleChangeBrand(event: React.SyntheticEvent, value: BrandType | null) {
    setBrand(value);
    if (setValue)
      setValue(value?.id)
    console.log('ListBrand', 'handleChangeBrand', value)
  }

  useEffect(() => {
    const get = async () => {
      const res = await BrandService.getBrands();
      setBrands(res);
      console.log('ListBrand', res);
    }
    get();
  }, []);

  return (
    <Box>
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
    </Box>
  );
}

export default ListBrand;
