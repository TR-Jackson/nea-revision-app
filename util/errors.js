import {
  reqAuthSchema,
  reqDeleteFlashcardSchema,
  reqCreateFolderSchema,
  reqDeleteFolderSchema,
  reqUpdateFolderSchema,
  reqReviseFolderSchema,
  reqResponseFlashcardSchema,
} from "../lib/yupSchemas";

export function checkReqBody(body, route) {
  let error = false;
  switch (route) {
    case "/auth/login":
      if (!reqAuthSchema.isValidSync(body)) error = true;
      break;

    case "/auth/register":
      if (!reqAuthSchema.isValidSync(body)) error = true;
      break;

    case "/flashcard/delete":
      if (!reqDeleteFlashcardSchema.isValidSync(body)) error = true;
      break;

    case "/folder/create":
      if (!reqCreateFolderSchema.isValidSync(body)) error = true;
      break;

    case "/folder/delete":
      if (!reqDeleteFolderSchema.isValidSync(body)) error = true;
      break;

    case "/folder/update":
      if (!reqUpdateFolderSchema.isValidSync(body)) error = true;
      break;

    case "/folder/revise":
      if (!reqReviseFolderSchema.isValidSync(body)) error = true;
      break;

    case "/flashcard/response":
      if (!reqResponseFlashcardSchema.isValidSync(body)) error = true;
      break;

    default:
      throw { message: "Server Error - Should not be reached", status: 500 };
  }
  if (error) {
    throw { message: "Bad request", status: 400 };
  } else return;
}

export function checkAuthError(error) {
  if (error) throw { message: error || "Error authenticating", status: 500 };
  else return;
}

export function checkAuthorised(user) {
  if (!user) throw { message: "Unauthorised", status: 401 };
  else return;
}
