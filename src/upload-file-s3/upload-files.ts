import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { getDateTimeForNameXml } from '../utiles/get-date';

const configS3 = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

AWS.config.update(configS3);
const s3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKET_NAME;

export async function uploadFiles(xmlData: string, country: string): Promise<void> {
  validateEnvVariables();
  const result = await folderCheckAndCreateFileXml(country, xmlData);
  const existsInS3 = await checkIfFileExistsInS3(bucketName, result.nameFile);
  if (!existsInS3) {
    await uploadFileToS3(result.assetsFolderPath, result.nameFile);
  }
}

async function checkIfFileExistsInS3(bucket, key): Promise<boolean> {
  try {
    const params = {
      Bucket: bucket,
      Prefix: key,
    };

    const data = await s3.listObjectsV2(params).promise();
    if (data.Contents) {
      return data.Contents.some((object) => object.Key === key);
    }
    return false;
  } catch (error) {
    console.error('Error al verificar la existencia del archivo en S3:', error);
    return false;
  }
}

async function uploadFileToS3(path: string, file: string): Promise<void> {
  try {
    const fileContent = await fs.promises.readFile(path + file, 'utf8');
    const params = {
      Bucket: bucketName,
      Key: file,
      Body: fileContent,
    };

    if (!params.Bucket) {
      throw new Error('El parámetro "Bucket" no está definido en el objeto params.');
    }

    await s3
      .upload({
        ...params,
        Bucket: params.Bucket as string,
      })
      .promise();
  } catch (error) {
    console.error('Error al subir el archivo a S3:', error);
    throw new Error(`rror al subir el archivo a S3:`);
  }
}

function validateEnvVariables(): void {
  const requiredVariables = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_BUCKET_NAME'];
  for (const variable of requiredVariables) {
    if (!process.env[variable]) {
      throw new Error(`Variable de entorno '${variable}' no definida.`);
    }
  }
}

async function folderCheckAndCreateFileXml(country, xmlData): Promise<{ assetsFolderPath: string; nameFile: string }> {
  const Path = '../assets/';
  const dateHous = getDateTimeForNameXml();
  const nameFile = country + '_' + dateHous + '.xml';
  const assetsFolderPath = path.join(__dirname, Path);
  try {
    await fs.promises.access(assetsFolderPath, fs.constants.F_OK);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await fs.promises.mkdir(assetsFolderPath);
      } catch (err) {
        console.error('Error al crear el directorio ', err);
      }
    } else {
      console.error('Error al acceder al directorio', err);
    }
  }

  try {
    const filePath = path.join(assetsFolderPath, nameFile);
    fs.writeFile(filePath, xmlData, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw new Error(`Error al crear archivo XML`);
  }
  return {
    assetsFolderPath,
    nameFile,
  };
}
