import {Autocomplete, Box, SxProps, TextField, Theme} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ModelService from "../../service/model-service";
import {ModelType} from "../../type/model-type";
import {useCarFilterStore} from "../../store/useCarFilterStore";


export interface ListTypeModelProps {
  setValue?: (val: number | null | undefined) => void;
  sx?: SxProps<Theme>;
}

function ListTypeModel({setValue, sx}: ListTypeModelProps) {
  const [typeModels, setTypeModels] = useState<ModelType[]>([]);
  const [typeModel, setTypeModel] = useState<ModelType | null>(null);

  function handleChangeModel(event: React.SyntheticEvent, value: ModelType | null) {
    setTypeModel(value);
    if (setValue)
      setValue(value?.id)
    console.log('ListTypeModel', 'handleChangeModel', value)
  }

  useEffect(() => {
    const get = async () => {
      const res = await ModelService.get();
      setTypeModels(res);
      console.log('ListTypeModel', res);
    }
    get();
  }, []);

  return (
    <Box>
      <Autocomplete
        disablePortal
        id="select-brand"
        value={typeModel}
        options={typeModels}
        getOptionLabel={option => option.name}
        onChange={handleChangeModel}
        fullWidth={true}
        sx={sx}
        renderInput={(params) => <TextField {...params} label="Тип моделі"/>}
      />
    </Box>
  );
}

export default ListTypeModel;
