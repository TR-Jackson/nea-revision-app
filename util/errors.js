import {
  reqAuthSchema,
  reqDeleteFlashcardSchema,
  reqCreateFolderSchema,
  reqDeleteFolderSchema,
  reqUpdateFolderSchema,
} from "../lib/yupSchemas";

export function checkReqBody(res, body, route) {
  console.log("checking");
  let error = false;
  switch (route) {
    case "/auth/login":
      if (!reqAuthSchema.isValid(body)) error = true;

    case "/auth/register":
      if (!reqAuthSchema.isValid(body)) error = true;

    case "/flashcard/delete":
      if (!reqDeleteFlashcardSchema.isValid(body)) error = true;

    case "/folder/create":
      if (!reqCreateFolderSchema.isValid(body)) error = true;

    case "/folder/delete":
      if (!reqDeleteFolderSchema.isValid(body)) error = true;

    case "/folder/update":
      if (!reqUpdateFolderSchema.isValid(body)) error = true;
  }
  if (error) {
    console.log("bad");
    return res.status(400).json({ message: "Bad request" });
  } else return;
}

export function checkAuthError(res, error) {
  console.log("bruh");
  if (error) return res.status(500).json({ message: "Error authenticating" });
  else return;
}

export function checkAuthorised(res, user) {
  if (!user) return res.status(401).json({ message: "Unauthorised" });
  else return;
}

export function mongoError(res) {
  res.status(500).sjon({ message: "Database error" });
}
