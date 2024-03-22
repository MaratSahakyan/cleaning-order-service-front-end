import { memo } from "react";
import { TextField } from "@mui/material";
import styles from "./styles.module.scss";

const CustomTextfield = ({ error, InputProps = {}, ...rest }) => {
  return (
    <div>
      <TextField {...rest} error={!!error} InputProps={InputProps} />
      {error ? <span className={styles.error}>{error}</span> : <></>}
    </div>
  );
};

export default memo(CustomTextfield);
