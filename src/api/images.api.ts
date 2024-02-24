import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
const route = express.Router();

route.get('/', (req, res) => {
  const { filename, width, height } = req.query;

  const types = ['jpg', 'png'];

  let image = '';

  types.forEach((type) => {
    const file = path.join(__dirname, `../../src/images/${filename}.${type}`);
    if (fs.existsSync(file)) {
      image = file;
      return;
    }
  });

  if (!image) {
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

  const extension = image.split('.').pop();

  const thumbnail = path.join(
    __dirname,
    `../../src/thumbnails/${filename}_${width}x${height}.${extension}`,
  );

  if (fs.existsSync(thumbnail)) {
    res.sendFile(thumbnail);
  } else {
    sharp(image)
      .resize(Number(width), Number(height))
      .toFile(thumbnail, () => {
        res.sendFile(thumbnail);
      });
  }
});
export default route;
