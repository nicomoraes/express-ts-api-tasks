import { Router } from 'express';

import * as controllers from './refresh-token.controllers';

const router = Router();

router.post('/refresh', controllers.refresh);

export default router;
