import { join } from 'path';
import * as express from 'express';

export const MulterExpresStatic = (app) => {
  const staticFolderPath = join(__dirname, '../upload');
  app.use('/upload', express.static(staticFolderPath));
};
