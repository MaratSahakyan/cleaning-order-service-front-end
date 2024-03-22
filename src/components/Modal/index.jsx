import React, { memo } from "react";
import { Backdrop, Box, Modal as MUIModal, MenuItem } from "@mui/material";
import style from "./styles.sx";

const Modal = ({ children, open, handleOpen, handleClose, title }) => {
  return (
    <div>
      <MenuItem onClick={handleOpen}>{title}</MenuItem>
      <MUIModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={style}>{children}</Box>
      </MUIModal>
    </div>
  );
};

export default memo(Modal);
