import valid from 'card-validator';

export function cardTest(field) {
  switch (field) {
    case 'number':
      return (value) => value && valid.number(value).isValid;
    case 'cvc':
      return (value) => value && valid.cvv(value).isValid;
    case 'expiry':
      return (value) => value && valid.expirationDate(value).isValid;
    default:
      throw new Error(`Unknown card field: ${field}`);
  }
}