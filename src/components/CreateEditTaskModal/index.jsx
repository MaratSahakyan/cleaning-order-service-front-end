import { memo, useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import {
  Autocomplete,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { employees } from "../../data/employee";
import { useFormik } from "formik";
import { STATUSES } from "../../data/task";
import CustomTextfield from "../CustomTextfield";
import ReactDatePicker from "react-datepicker";
import { hotels } from "../../data/hotel";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";
import { useStore } from "../../state/store/StoreProvider";

const initialValues = {
  employee: {},
  status: "",
  address: "",
  hotel: {},
  rooms: [],
  startTime: "",
  finishTime: "",
  deadline: "",
};

const CreateEditTaskModal = ({ title, handleClick }) => {
  const { taskToEdit, createTask, editTask, handleCleanTaskToEdit } =
    useStore();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (handleClick) {
      handleClick();
    }
  }, [handleClick]);
  const handleClose = useCallback(() => {
    setOpen(false);
    handleCleanTaskToEdit();
  }, [handleCleanTaskToEdit]);

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      try {
        if (values.id) {
          editTask(values);
        } else {
          createTask(values);
        }
        resetForm();

        handleClose();
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    },
    [handleClose, createTask, editTask]
  );

  const {
    values,
    setValues,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: taskToEdit ? taskToEdit : initialValues,
    onSubmit: (values, action) => {
      onSubmit(values, action);
      handleCleanTaskToEdit();
      handleReset();
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      setValues(taskToEdit);
    }
  }, [taskToEdit, setValues]);

  return (
    <Modal
      open={open}
      handleOpen={handleOpen}
      handleClose={() => {
        handleClose();
      }}
      title={title}
    >
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" style={{ paddingBottom: "10px" }}>
          {taskToEdit ? "Edit Task" : "Create Task"}
        </Typography>
        <form className={styles.container} onSubmit={handleSubmit}>
          <Grid>
            <InputLabel id="demo-simple-select-label">
              Select Employee
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="employee"
              name="employee"
              value={values.employee}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee}>
                  {employee.username}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid>
            <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {Object.values(STATUSES).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid>
            <InputLabel id="demo-simple-select-label">Select Hotel</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="hotel"
              name="hotel"
              value={values.hotel}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {hotels.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel}>
                  {hotel.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid>
            <InputLabel id="demo-simple-select-label">
              Select Apartment/Room
            </InputLabel>
            <Autocomplete
              multiple
              id="size-small-outlined-multi"
              size="small"
              name="rooms"
              options={values.hotel.rooms || []}
              getOptionLabel={(option) => option.toString()}
              onChange={(_, value) => setFieldValue("rooms", value)}
              value={values.rooms}
              defaultValue={values.rooms}
              renderInput={(p) => (
                <CustomTextfield {...p} className={styles.autoComplete} />
              )}
            />
          </Grid>
          <Grid>
            <InputLabel id="demo-simple-select-label">
              Select Start Time
            </InputLabel>
            <div className={styles.dateContainer}>
              <ReactDatePicker
                className={styles.datePicker}
                style={{ width: "100%" }}
                selected={values.startTime}
                onChange={(date) => setFieldValue("startTime", date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </Grid>
          <Grid>
            <InputLabel id="demo-simple-select-label">
              Select Finish Time
            </InputLabel>
            <div className={styles.dateContainer}>
              <ReactDatePicker
                className={styles.datePicker}
                style={{ width: "100%" }}
                selected={values.finishTime}
                onChange={(date) => setFieldValue("finishTime", date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </Grid>
          <Grid>
            <InputLabel id="demo-simple-select-label">
              Select Deadline
            </InputLabel>
            <div className={styles.dateContainer}>
              <ReactDatePicker
                className={styles.datePicker}
                style={{ width: "100%" }}
                selected={values.deadline}
                onChange={(date) => setFieldValue("deadline", date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </Grid>
          <div className={styles.buttonContainer}>
            <Button color="error">Cancel</Button>
            <Button color="success" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default memo(CreateEditTaskModal);
