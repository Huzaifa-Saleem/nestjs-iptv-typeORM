import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log({
      logger: {
        url: req.originalUrl,
        time: new Date().toLocaleString(),
      },
    });

    next();
  }
}
