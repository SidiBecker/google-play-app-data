import { ErrorRequestHandler } from 'express';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, respose, next) => {
  console.error(error);

  return respose.status(500).json({ messsage: 'Internal server error' });
};

export default errorHandler;
