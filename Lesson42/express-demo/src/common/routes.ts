import { Router } from 'express'

const router: Router = Router()

// import routes
import userRouter from '../resources/users/routes'
import productRouter from '../resources/products/routes'

// Higher level routes definition
router.use('/users', userRouter)
router.use('/products', productRouter)


export default router
