export const normalizeError = (error) => {
 if (!error) return {status: 500, data: 'Server Error'};

 return {
    status: error.status || error.response?.status || 500,
    data:
      error.data ||
      error.response?.data?.message || 
      (typeof error.response?.data === 'string' ? error.response?.data : null) ||
      error.message ||
      'Server Error',
  };
};