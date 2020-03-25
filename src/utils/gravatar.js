// librerí que se conecta a la web gravatar.com y de ahí
// trae una imagen que está asociada con el mail que se ingresa.pad1
// Se requiere instalar MD5

import md5 from 'md5';
const gravatar = (email) => {
  const base = 'https://gravatar.com/avatar/';
  // del mail eliminarmos espacios y convertimos todo a minúsculas. 
  const formattedEmail = (email).trim().toLowerCase();
  const hash = md5(formattedEmail, { encoding: "binary"});
  return `${base}${hash}`;
};

export default gravatar;
