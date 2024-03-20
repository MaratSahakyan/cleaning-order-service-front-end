import { object, string } from "yup";

export const validationSchema = object().shape({
  email: string().email("Email must be valid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
