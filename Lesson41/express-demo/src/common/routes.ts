import { Router } from 'express'

const router: Router = Router()

// import routes
import userRouter from '../resources/users/routes'

// Higher level routes definition
router.use('/users', userRouter)
// router.use('/products', productsRouter)


export default router
