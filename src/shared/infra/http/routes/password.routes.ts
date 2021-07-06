import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/useCases/ResetPassword/ResetPasswordController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMail = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot-password', sendForgotPasswordMail.handle);
passwordRoutes.post('/reset-password', resetPasswordController.handle);

export { passwordRoutes };
