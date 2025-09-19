const constraintErrors = {
  Banks_balance_ck: {
    code: 406,
    message: 'Not Enough money',
  },
  Users_balance_ck: {
    code: 406,
    message: 'Not Enough money',
  },
};

module.exports = (err, req, res, next) => {

  if (err.constraint && constraintErrors[err.constraint]) {
    const { code, message } = constraintErrors[err.constraint];
    return res.status(code).json({ message });
  }

  if (err.code && err.message) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(500).json({ message : 'Server Error' });
};
