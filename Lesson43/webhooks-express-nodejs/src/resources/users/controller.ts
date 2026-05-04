import { Request, Response, NextFunction } from 'express'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // use dummy data for now
    const users = ['John Doe', 'Jane Doe', 'John Smith', 'Jane Smith']
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check incoming request and the data passed for creating new user
    // validate the date format (e.g. zod library)
    // If format is incorrect, return res.status(400).json({message: 'Incorrect data provided'})
    // if data correct, save user to DB, then return saved user as response
    res.status(200).json({"username": "johndoe", "email": "john@gmail.com"});
  } catch (error) {
    next(error)
  }
}

export default {
  getAll,
  createOne,
}
