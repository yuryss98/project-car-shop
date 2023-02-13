import { ErrorRequestHandler } from 'express';
import HttpException from '../error/HttpException';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { statusCode, message } = err as HttpException;
  
  if (message.includes('failed for value')) {
    return res.status(422).json({ message: 'Invalid mongo id' });
  }

  res.status(statusCode || 500).json({ message });
};

export default errorHandler;