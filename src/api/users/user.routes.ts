import { Router } from 'express';

import * as controllers from './user.controllers';
import { UserAuthSchema } from './user.model';

import { validateBody } from '@middlewares/schema-validator';

const router = Router();

router.post('/create', validateBody(UserAuthSchema), controllers.create);
router.post('/login', validateBody(UserAuthSchema), controllers.login);

export default router;
