import logger from "../utils/logger.js"
const globalErrorHandler = async (err, req, res, next) => {

  logger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    stack: err.stack

  })
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal server error"
    })
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong..."
  })
}


export default globalErrorHandler;