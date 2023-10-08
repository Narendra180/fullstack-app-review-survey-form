const notFound = (req, res, next) => {
  const error = new Error(`No Resource found with the url ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200? 500: res.statusCode;
  let message = err.message;

  if(err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "There is no submission with the given id!"
  }

  res.status(statusCode).json({
    success: "fail",
    message,
    stack: process.env.NODE_ENV === "production"? null: err.stack
  })
}

export { notFound, errorHandler }