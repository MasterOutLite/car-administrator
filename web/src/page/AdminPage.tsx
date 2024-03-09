import React, {useEffect} from 'react';
import {Box, Container, Tab, Tabs} from "@mui/material";
import CreateCar from "../component/CreateCar/CreateCar";
import {useAuthStore} from "../store/useAuthStore";
import {useNavigate} from "react-router-dom";
import {TabPanel} from "../component/TabPanel/TabPanel";
import CreateBrand from "../component/CreateBrand/CreateBrand";
import CreateModel from "../component/CreateModel/CreateModel";

function AdminPage() {
  const {token} = useAuthStore();
  const navigate = useNavigate();

  const [tab, setTab] = React.useState(1);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!token) {
      console.log(token)
      navigate('/auth')
    }
  }, [token]);

  return (
    <Container>

      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs onChange={handleTab} value={tab}>
          <Tab label={'Додати автомобіль'}/>
          <Tab label={'Додати Бренд'}/>
          <Tab label={'Додати Модель'}/>
        </Tabs>
      </Box>

      <TabPanel index={0} value={tab}>
        <CreateCar/>
      </TabPanel>

      <TabPanel index={1} value={tab}>
        <CreateBrand/>
      </TabPanel>

      <TabPanel index={2} value={tab}>
        <CreateModel/>
      </TabPanel>

    </Container>
  );
}

export default AdminPage;
