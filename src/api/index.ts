import express from 'express';

import refresh_token from './refresh-token/refresh-token.routes';
import tasks from './tasks/task.routes';
import users from './users/user.routes';

const router = express.Router();

router.use('/tasks', tasks);
router.use('/users', users);
router.use('/refresh-token', refresh_token);

export default router;
