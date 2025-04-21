import * as Yup from "yup";

const RegisterSpSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required("Owner Name is required")
    .min(3, "Owner Name must be at least 3 characters"),
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
  location: Yup.string()
    .oneOf(["Done"], "Location must be set to Done")
    .required("Location is required"),
});

export default RegisterSpSchema;
