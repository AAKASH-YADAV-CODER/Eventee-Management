const asyncHandler = (fun) => async (err, req, res, next) => {
  try {
    await fun(err, req, res, next);
  } catch (err) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message,
    });
  }
};

export { asyncHandler };

/*
  const asyncHandler = (fun) => async (err, req, res, next) => {
      try {
          await fun(err,req,res,next)
      } catch (err) {
          res.status((err.code || 500)).json({
              success: false,
              message:err.message
          })
      }
  }
  */
