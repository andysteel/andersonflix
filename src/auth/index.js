import dotenv from 'dotenv';
import config from '../config/index';

dotenv.config();

export default async function authRequest() {
  const accessToken = await fetch(`${config.URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: process.env.REACT_APP_EMAIL_ANDERSONFLIX,
      password: process.env.REACT_APP_PASSWORD_ANDERSONFLIX,
    }),
  }).then((resposta) => resposta.text()
    .then((token) => token))
    .catch((error) => { throw new Error(`Não foi possível Realizar o login - ${error}`); });
  return JSON.parse(accessToken);
}
