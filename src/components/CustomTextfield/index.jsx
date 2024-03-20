import { memo } from "react";
import { TextField } from "@mui/material";
import styles from "./styles.module.scss";

const CustomTextfield = ({ error, ...rest }) => {
  return (
    <div>
      <TextField {...rest} error={!!error} />
      {error ? <span className={styles.error}>{error}</span> : <></>}
    </div>
  );
};

export default memo(CustomTextfield);
