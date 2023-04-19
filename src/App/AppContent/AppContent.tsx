import Box from "@mui/material/Box";
import Home from "../../components/Home/Home";
import {useEffect} from "react";

const AppContent = () => {
  useEffect(() => {
    console.log(process.env)
  })

  return <Box sx={{ margin: "10px" }}>
    <Home/>
  </Box>;
};

export default AppContent;
