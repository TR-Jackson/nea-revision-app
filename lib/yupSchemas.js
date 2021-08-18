import * as yup from "yup";

export const newFolderFormSchema = yup.object().shape({
  description: yup.string(),
  folderName: yup
    .string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
});

export const authFormSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  password: yup.string().min(8, "Too Short!").required("Required"),
  // email: yup.string().email("Invalid email").required("Required"),
});
