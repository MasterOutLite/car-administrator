import {Autocomplete, Box, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ModelService from "../../service/model-service";
import {ModelType} from "../../type/model-type";
import {useCarFilterStore} from "../../store/useCarFilterStore";


export interface ListTypeModelProps {

}

function ListTypeModel({}: ListTypeModelProps) {
  const [typeModels, setTypeModels] = useState<ModelType[]>([]);
  const [typeModel, setTypeModel] = useState<ModelType | null>(null);

  const {setModelId} = useCarFilterStore();

  function handleChangeModel(event: React.SyntheticEvent, value: ModelType | null) {
    setTypeModel(value);
    setModelId(value?.id);
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
        sx={{width: 300}}
        renderInput={(params) => <TextField {...params} label="Тип моделі"/>}
      />
    </Box>
  );
}

export default ListTypeModel;
