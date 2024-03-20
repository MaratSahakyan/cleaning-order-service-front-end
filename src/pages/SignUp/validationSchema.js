import { object, ref, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Name is required"),
  lastName: string().required("Last Name is required"),
  email: string().email("Email must be valid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  repeatPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Repeat password is required")
    .min(8, "Repeat password must be at least 8 characters long"),
});
