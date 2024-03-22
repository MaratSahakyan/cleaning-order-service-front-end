import React, { memo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../../state/auth/AuthProvider";
import styles from "./styles.module.scss";
import CreateEditTaskModal from "../CreateEditTaskModal";

const MainHeader = () => {
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <Drawer /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cleaning Service
        </Typography>
        <div className={styles.container}>
          <div className={styles.userInfo}>
            <p>{user.role.includes("user") ? user.username : user.name}</p>
            <p>{user.email}</p>
          </div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user.role.includes("admin") ? (
              <CreateEditTaskModal title="Create Task" />
            ) : (
              <></>
            )}
            <MenuItem onClick={signOut}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(MainHeader);
