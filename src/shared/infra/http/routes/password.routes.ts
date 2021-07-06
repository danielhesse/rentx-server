import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMail = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot-password', sendForgotPasswordMail.handle);

export { passwordRoutes };
