import { Request, Response } from 'express'

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'Not found.' })
}

export default unknownEndpoint
