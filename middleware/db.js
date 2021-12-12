export default function (error, doc, next) {
  console.log(error)
  if (error) throw { message: 'Database error', status: 500 }
  else next()
}
