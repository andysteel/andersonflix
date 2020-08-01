import config from '../config/index';
import authRequest from '../auth/index';

const URL_VIDEOS = `${config.URL_API}/api/videos`;

async function create(objetoDoVideo) {
  const authResponse = await authRequest();

  return fetch(URL_VIDEOS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authResponse.accessToken}`,
    },
    body: JSON.stringify(objetoDoVideo),
  })
    .then(async (resposta) => {
      if (await resposta.ok) {
        const resultado = objetoDoVideo;
        return resultado;
      }

      throw new Error('Não foi possível acessar o banco de dados.');
    });
}

export default {
  create,
};
