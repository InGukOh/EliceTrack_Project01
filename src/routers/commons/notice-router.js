import { Router } from 'express';

import { noticeController } from '../../controllers/notice-controller';
import { asyncHandler, authenticator, checkRole } from '../../middlewares';

const noticeRouter = Router();

noticeRouter.get('/', asyncHandler(noticeController.getNotice));
noticeRouter.get('/:noticeId', asyncHandler(noticeController.getNoticeDetail));
noticeRouter.use(authenticator.isLoggedIn, checkRole);
noticeRouter.post('/createNotice', asyncHandler(noticeController.createNotice));
noticeRouter.put('/:noticeId', asyncHandler(noticeController.updateNotice));
noticeRouter.delete(
  '/delete/:noticeId',
  asyncHandler(noticeController.deleteNotice),
);

export { noticeRouter };
