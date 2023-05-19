import { Router } from 'express';

import * as controllers from './refresh-token.controllers';
import { RefreshTokenSchema } from './refresh-token.model';

import { validateBody } from '@middlewares/schema-validator';

const router = Router();

router.post('/refresh', validateBody(RefreshTokenSchema), controllers.refresh);

export default router;
