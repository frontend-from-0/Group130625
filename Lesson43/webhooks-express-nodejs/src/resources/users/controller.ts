import { Request, Response, NextFunction } from 'express';
import logger from '../../common/logger';
import { createUserSchema, toApiUser } from './schemas';
import { createUser } from '../../services/dbService';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // use dummy data for now
    const users = ['John Doe', 'Jane Doe', 'John Smith', 'Jane Smith'];
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Check authentication!!!!

  try {
    // TODO: anna to fix log message
    logger.debug({}, req.body);
    logger.info({}, req.body);

    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
      logger.debug(result.error);
      
      res.status(400).json({ message: 'Incorrect data provided' });
    } else {
      const createdUser = await createUser(result.data);
      const apiUser = toApiUser(createdUser);
      res.status(200).json({...apiUser});
    }

  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  createOne,
};
