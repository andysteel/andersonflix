import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault, { Main } from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriaRepository from '../../../repositories/categorias';
import DivLink from '../../../components/DivLink';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#000000',
    link_extra: {
      text: '',
      url: '',
    },
  };

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    categoriaRepository
      .getAll()
      .then((categoriasFromDB) => setCategorias(categoriasFromDB));
  }, []);

  const { values, handleChange, clearForm } = useForm(valoresIniciais);

  return (
    <PageDefault pathPagina="/cadastro/video" nomeBotao="Novo vídeo">
      <Main>
        <h1>
          Cadastro de Categoria
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();

          categoriaRepository.create({
            titulo: values.titulo,
            descricao: values.descricao,
            cor: values.cor,
            link_extra: {
              text: values.link_extra.text,
              url: '',
            },
          }).then(() => categoriaRepository
            .getAll()
            .then((categoriasFromDB) => setCategorias(categoriasFromDB)));

          clearForm();
        }}
        >
          <FormField
            label="Nome da categoria"
            type="text"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
          />
          <FormField
            label="Frase de efeito"
            type="text"
            name="link_extra.text"
            value={values.link_extra.text}
            onChange={handleChange}
          />
          <FormField
            label="Descrição"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
            as="textarea"
          />
          <FormField
            label="Cor"
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
              {categoria.titulo}
            </li>
          ))}
        </ul>

        <DivLink>
          <Link to="/">← Home</Link>
        </DivLink>
      </Main>
    </PageDefault>
  );
}

export default CadastroCategoria;
