import * as Yup from "yup";
const YupRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required")
    .trim(),

  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required")
    .trim(),

  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string().min(8).required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensure it matches the 'pass' field
    .required("Confirm password is required"), // Ensure it's not empty

  cnic: Yup.string()
    .required("CNIC is required")
    .matches(/^\d{13}$/, "CNIC must be a 13-digit number"),

  phone: Yup.string()
    .matches(/^(03)\d{9}$/, "Phone number must be 11 digits starting with 03")
    .required("Phone number is required"),
});
export default YupRegisterSchema;
