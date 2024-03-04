import React from 'react';
import {Container, Stack} from "@mui/material";
import ListBrand from "../component/ListBrand/ListBrand";
import ListTypeModel from "../component/ListTypeModel/ListTypeModel";
import RenderCarCard from "../component/RenderCarCard/RenderCarCard";

function MainPage() {
  return (
    <Container sx={{marginTop: 2}}>
      <Stack direction='row' gap={2}>
        <ListBrand/>
        <ListTypeModel/>
      </Stack>

      <RenderCarCard/>
    </Container>
  );
}

export default MainPage;
