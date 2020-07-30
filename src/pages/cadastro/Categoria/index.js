import React, { useState, useEffect } from 'react';
import PageDefault, { Main } from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(evento) {
    setValue(
      evento.target.getAttribute('name'),
      evento.target.value,
    );
  }

  useEffect(() => {
    const URL = window.location.href.includes('localhost')
      ? 'http://localhost:8080/api/categorias'
      : 'https://andersonflix.herokuapp.com/api/categorias';
    fetch(URL)
      .then(async (respostaDoServer) => {
        if (respostaDoServer.ok) {
          const resposta = await respostaDoServer.json();
          setCategorias(resposta);
          return;
        }
        throw new Error('Não foi possível acessar os dados');
      });
  }, []);

  return (
    <PageDefault pathPagina="/cadastro/video" nomeBotao="Novo vídeo">
      <Main>
        <h1>
          Cadastro de Categoria:
          {values.nome}
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          setCategorias([
            ...categorias,
            values,
          ]);
          setValues(valoresIniciais);
        }}
        >
          <FormField
            label="Nome da categoria:"
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />
          <FormField
            label="Descrição:"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
            as="textarea"
          />
          <FormField
            label="Cor:"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />
          <Button>
            Cadastrar
          </Button>
        </form>

        <ul>
          {categorias.map((categoria) => (
            <li key={`${categoria.id}`}>
              {categoria.nome}
            </li>
          ))}
        </ul>
      </Main>
    </PageDefault>
  );
}

export default CadastroCategoria;
