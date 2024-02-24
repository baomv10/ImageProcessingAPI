import express from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../utilities/resize-image';
const route = express.Router();

route.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { filename, width, height } = req.query;

    const types = ['jpg', 'png'];

    let filenameType = '';

    types.forEach((type) => {
      const file = path.join(__dirname, `../../src/images/${filename}.${type}`);
      if (fs.existsSync(file)) {
        filenameType = `${filename}.${type}`;
        return;
      }
    });

    if (!filenameType) {
      res.status(400).send('invalid filename');
      return;
    }

    if (!width || !height) {
      res.status(400).send('missing width or height');
      return;
    }

    if (width && height) {
      if (!Number.isInteger(+width) || !Number.isInteger(+height)) {
        res.status(400).send('invalid width or height');
        return;
      }
    }

    const result = await resizeImage(
      filenameType,
      Number(width),
      Number(height),
    );

    res.sendFile(result);
  },
);
export default route;
