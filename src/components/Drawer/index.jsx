import React, { memo, useState } from "react";
import {
  Box,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import { MenuOpenOutlined } from "@mui/icons-material";
import { useAuth } from "../../state/auth/AuthProvider";

const adminPanel = ["Hotels", "Employees"];
const employeePanel = ["Arrangements"];

const Drawer = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {(user.role.includes("admin") ? adminPanel : employeePanel).map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuOpenOutlined />
      </IconButton>
      <MUIDrawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </MUIDrawer>
    </div>
  );
};

export default memo(Drawer);
