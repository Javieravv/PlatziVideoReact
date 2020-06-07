import fs from 'fs';

// eslint-disable-next-line consistent-return
const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
  } catch (error) {
    console.log('se ha producido un error....', error);
  }
};

export default getManifest;
