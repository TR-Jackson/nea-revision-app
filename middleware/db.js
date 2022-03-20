// Function checks for an error after a database action and throws an error if an error has occurred, used in the data models
export default function (error, doc, next) {
  if (error) throw { message: 'Database error', status: 500 }
  else next()
}
