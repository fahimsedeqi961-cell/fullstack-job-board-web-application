
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    // Points to the current onbject of this class
    this.statusCode = statusCode;
    // States that this is expected error
    this.isOperational = true;

    Error.captureStackTrace(this, this.constractor);
  }
}

export default AppError;