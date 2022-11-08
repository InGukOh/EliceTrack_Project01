import { Router } from 'express';

// export * from './user-router';
// export * from './product-router';
// export * from './category-router';
//export * from './admin-router';

import { adminRouter } from './admins';
import { userRouter } from './users/user-router';
import {
  cartRouter,
  categoryRouter,
  productRouter,
  orderRouter,
} from './commons';

import { authenticator } from '../middlewares/authentication';

import { viewsRouter } from './views-router';

const router = Router();

router.use('/access', authenticator.accessVerify);
router.use('/refresh', authenticator.refreshVerify);

router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);

export { router, viewsRouter };
