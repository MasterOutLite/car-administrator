import React, {useEffect, useState} from 'react';
import BrandService from "../../service/brand-service";
import {BrandType} from "../../type/brand-type";
import {Autocomplete, Box, TextField} from '@mui/material';
import {useCarFilterStore} from "../../store/useCarFilterStore";

function ListBrand() {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [brand, setBrand] = useState<BrandType | null>(null);
  const {setBrandId} = useCarFilterStore();

  function handleChangeBrand(event: React.SyntheticEvent, value: BrandType | null) {
    setBrand(value);
    setBrandId(value?.id);
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
        sx={{width: 300}}
        renderInput={(params) => <TextField {...params} label="Бренд"/>}
      />
    </Box>
  );
}

export default ListBrand;
