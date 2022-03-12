import {
  reqAuthSchema,
  reqDeleteFlashcardSchema,
  reqCreateFolderSchema,
  reqDeleteFolderSchema,
  reqUpdateFolderSchema,
  reqReviseFolderSchema,
  reqResponseFlashcardSchema,
  reqEditFlashcardSchema,
  reqEditFolderSchema
} from '../lib/yupSchemas'

export function checkReqBody (body, route) {
  let error = false
  switch (route) {
  case '/auth/login':
    if (!reqAuthSchema.isValidSync(body)) error = true
    break

  case '/auth/register':
    if (!reqAuthSchema.isValidSync(body)) error = true
    break

  case '/flashcard/delete':
    if (!reqDeleteFlashcardSchema.isValidSync(body)) error = true
    break

  case '/folder/create':
    if (!reqCreateFolderSchema.isValidSync(body)) error = true
    break

  case '/folder/edit':
    if (!reqEditFolderSchema.isValidSync(body)) error = true
    break

  case '/folder/delete':
    if (!reqDeleteFolderSchema.isValidSync(body)) error = true
    break

  case '/folder/update':
    if (!reqUpdateFolderSchema.isValidSync(body)) error = true
    break

  case '/folder/revise':
    if (!reqReviseFolderSchema.isValidSync(body)) error = true
    break

  case '/flashcard/response':
    if (!reqResponseFlashcardSchema.isValidSync(body)) error = true
    break

  case '/flashcard/edit':
    if (!reqEditFlashcardSchema.isValidSync(body)) error = true
    break

  default:
    throw { message: 'Critical Server Error', status: 500 }
  }
  if (error) throw { message: 'Bad request', status: 400 }
}

export function checkAuthError (error) {
  if (error) throw { message: error || 'Error authenticating', status: 401 }
}

export function checkAuthorised (user) {
  if (!user) throw { message: 'Unauthorised', status: 401 }
}
