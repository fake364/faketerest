import { RegistrationService } from '../RegistrationService';
import { MB_3_IN_BYTES } from '../../../constants/commons';
import path from 'path';
import fs from 'fs';
import { UserData } from '../../../types/user-types/UserData';
import formidable from 'formidable';
import { NextApiRequest } from 'next';

export class PublicProfileService extends RegistrationService {
  public static instance: PublicProfileService;

  async handleFormData(req: NextApiRequest, userId) {
    const form = new formidable.IncomingForm();

    form.maxFileSize = MB_3_IN_BYTES;
    form.uploadDir = path.join('public', 'user', String(userId));

    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }
    const result: UserData | undefined = await new Promise(
      (resolve, reject) => {
        form.parse(req, (err, fields, file) => {
          if (err) {
            reject(err);
            return;
          }
          fs.rename(
            file.image.filepath,
            form.uploadDir + '/avatar.png',
            () => {}
          );

          resolve(fields);
        });
      }
    );
    return result;
  }
}

const PublicProfileServiceInstance = new PublicProfileService();

export default PublicProfileServiceInstance;
