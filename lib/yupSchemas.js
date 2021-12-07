import * as yup from "yup";

export const newFolderFormSchema = yup.object().shape({
  description: yup.string(),
  folderName: yup
    .string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
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

export const flashcardFormSchema = yup.object().shape({
  front: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  back: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const reqAuthSchema = yup.object().shape({
  username: yup.string().min(2).max(25).required(),
  password: yup.string().min(8).required(),
});

export const reqDeleteFlashcardSchema = yup.object().shape({
  flashcardId: yup.string().length(24).required(),
});

export const reqCreateFolderSchema = yup.object().shape({
  folderName: yup.string().min(2).max(50).required(),
  description: yup.string().max(50),
});

export const reqDeleteFolderSchema = yup.object().shape({
  folder: yup.string().min(2).max(50).required(),
});

export const reqUpdateFolderSchema = yup.object().shape({
  folder: yup.string().min(2).max(50).required(),
  flashcards: yup.array().min(1).required(),
});

export const reqReviseFolderSchema = yup.object().shape({
  folderName: yup.string().min(2).max(50).required(),
});
