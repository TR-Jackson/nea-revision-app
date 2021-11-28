export default function (error, doc, next) {
  if (error) throw { message: "Database error", status: 500 };
  else next();
}
