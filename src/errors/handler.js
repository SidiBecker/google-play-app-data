function errorHandler(error, request, respose, next) {
  console.error(error);

  return respose.status(500).json({ messsage: 'Internal server error' });
}

export default errorHandler;
