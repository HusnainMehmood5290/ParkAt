import * as Yup from "yup";

const RegisterVoSchema = Yup.object().shape({
  vehicleNumber: Yup.string().required(
    "Vehicle Registration Number is required"
  ),
  length: Yup.number()
    .required("Length is required")
    .positive("Length must be positive"),
  width: Yup.number()
    .required("Width is required")
    .positive("Width must be positive"),
  height: Yup.number()
    .required("Height is required")
    .positive("Height must be positive"),
  document: Yup.mixed().required("Document is required"), // Add validation for document
});

export default RegisterVoSchema;
