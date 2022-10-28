import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export default function FloatingActionButtonZoom({ handleClose }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 500,
        position: "relative",
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="transparent" sx={{ bgcolor: "" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab
            label={
              <span style={{ color: "black", fontSize: "17px" }}>매수</span>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <span style={{ color: "black", fontSize: "17px" }}>매도</span>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TextField
            margin="dense"
            id="name"
            label="매수 금액"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: "100px" }}
          />
          <Box sx={{ marginLeft: "69%" }}>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleClose}>매수</Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TextField
            margin="dense"
            id="name"
            label="매도 금액"
            type="email"
            fullWidth
            variant="standard"
            sx={{ marginBottom: "100px" }}
          />
          <Box sx={{ marginLeft: "69%" }}>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleClose}>매도</Button>
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
