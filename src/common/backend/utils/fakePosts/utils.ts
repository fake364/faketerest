import fs from 'fs';
import path from 'path';

export const getImageBase64UrlById = (postId: string) => {
  const uintArr = fs.readFileSync(
    path.join('public', 'posts', `${postId}.jpg`)
  );
  if (uintArr.length === 0) {
    if (!postId) {
      return null;
    }
  }
  const base64EncodedImage = uintArr.toString('base64');
  const mimeType = 'image/jpg';
  return `data:${mimeType};base64,${base64EncodedImage}`;
};
