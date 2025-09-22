module.exports = (err) => {
  if (!err.inner) return {};
  return err.inner.reduce((acc, { path, message }) => {
    if (path && !acc[path]) acc[path] = message;
    return acc;
  }, {});
};
