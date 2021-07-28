import * as express from 'express';
import SystemStatusController from './components/system-status/system-status.controller';
import UserController from './components/user/user';

export default function registerRoutes(app: express.Application): void {
    new UserController(app);
    new SystemStatusController(app);
}
