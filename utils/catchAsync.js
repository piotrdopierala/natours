module.exports = (fn) => {
  const asyncFn = (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
  return asyncFn;
};
