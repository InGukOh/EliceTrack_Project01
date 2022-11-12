import { Router } from 'express';
import { OrderController } from '../../controllers/order-controller';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userController } from '../../controllers/user-controller';
import { authenticator, userValidator, asyncHandler } from '../../middlewares';

const userRouter = Router();

//////// 계정관련 ////////
//회원가입
userRouter.post(
  '/',
  userValidator.createUser,
  asyncHandler(userController.createUser),
  // asyncHandler(userController.logIn),
);

//로그인
userRouter.post(
  '/login',
  userValidator.login,
  asyncHandler(userController.logIn),
);

//내 비밀번호 초기화
userRouter.post(
  '/reset-password',
  userValidator.resetPassword,
  asyncHandler(userController.resetPassword),
);

// 로그인 검증 후 id / role 지정
userRouter.use(authenticator.isLoggedIn);

//내 계정정보
userRouter.get('/myinfo', asyncHandler(userController.getMyInfo));

//내 비밀번호 확인
userRouter.post('/chkPassword', asyncHandler(userController.checkPassword));

//내 비밀번호 변경
userRouter.put(
  '/myinfo/password',
  userValidator.checkPassword,
  asyncHandler(userController.changePassword),
);

//내 계정정보 변경
userRouter.put(
  '/myinfo',
  userValidator.updateUser,
  asyncHandler(userController.updateUser),
);

//회원 탈퇴
userRouter.put(
  '/myinfo/delete',
  userValidator.deleteUser,
  asyncHandler(userController.deleteUser),
);
//////// 계정관련 ////////

export { userRouter };
