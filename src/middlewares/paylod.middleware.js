const payloadMiddleWare = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }
    next();
  };
};

module.exports = payloadMiddleWare;
