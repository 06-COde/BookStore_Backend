const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "production"
      ? "Something went wrong!" 
      : err.message,           
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }) 
    
  });
};

export default errorHandler;
