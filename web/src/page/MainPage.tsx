import React from 'react';
import {Container, Stack} from "@mui/material";
import ListBrand from "../component/ListBrand/ListBrand";
import ListTypeModel from "../component/ListTypeModel/ListTypeModel";
import RenderCarCard from "../component/RenderCarCard/RenderCarCard";
import {useCarFilterStore} from "../store/useCarFilterStore";

function MainPage() {
  const {setBrandId} = useCarFilterStore();
  const {setModelId} = useCarFilterStore();

  return (
    <Container sx={{marginTop: 2}}>
      <Stack direction='row' gap={2} pb={2}>
        <ListBrand sx={{width: 300}} setValue={setBrandId}/>
        <ListTypeModel sx={{width: 300}} setValue={setModelId}/>
      </Stack>

      <RenderCarCard/>
    </Container>
  );
}

export default MainPage;
