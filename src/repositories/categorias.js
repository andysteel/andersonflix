import config from '../config/index';
import authRequest from '../auth/index';

const URL_CATEGORIAS = `${config.URL_API}/api/categorias`;

async function getAllWithVideos() {
  const authResponse = await authRequest();

  return fetch(`${URL_CATEGORIAS}?_embed=videos`, {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${authResponse.accessToken}`,
    },
  }).then(async (consulta) => {
    if (await consulta.ok) {
      const resultado = consulta.json();
      return resultado;
    }

    throw new Error('Não foi possível acessar os dados.');
  }).catch((error) => { throw new Error('Não foi possível acessar os dados.', error); });
}

async function getAll() {
  const authResponse = await authRequest();

  return fetch(URL_CATEGORIAS, {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${authResponse.accessToken}`,
    },
  }).then(async (resposta) => {
    if (resposta.ok) {
      const resultado = await resposta.json();
      return resultado;
    }

    throw new Error('Não foi possível acessar os dados.');
  });
}

async function create(objetoDaCategoria) {
  const authResponse = await authRequest();

  return fetch(URL_CATEGORIAS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authResponse.accessToken}`,
    },
    body: JSON.stringify(objetoDaCategoria),
  })
    .then(async (resposta) => {
      if (await resposta.ok) {
        const resultado = objetoDaCategoria;
        return resultado;
      }

      throw new Error('Não foi possível acessar o banco de dados.');
    });
}

export default {
  getAllWithVideos,
  getAll,
  create,
};
