import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const extension = path.parse(filename).ext;
  const name = path.parse(filename).name;
  const thumbnail = path.join(
    __dirname,
    `../../src/thumbnails/${name}_${width}x${height}${extension}`,
  );
  const image = path.join(__dirname, `../../src/images/${name}${extension}`);

  if (!fs.existsSync(thumbnail)) {
    await sharp(image).resize(Number(width), Number(height)).toFile(thumbnail);
  }
  return thumbnail;
};
