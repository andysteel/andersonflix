import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageDefault, { Main } from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriaRepository from '../../../repositories/categorias';
import videoRepository from '../../../repositories/videos';
import DivLink from '../../../components/DivLink';

function getYouTubeId(youtubeURL) {
  return youtubeURL.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, '$7');
}

const Section = styled.section`
    margin-bottom: 100px;
    & ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 16px;
        @media (max-width: 800px) {
            padding-inline-start: 0px;
        }
    }
`;

const Titulo = styled.h3`
    opacity: 0;
    transition: .3s;
    position: absolute;
    margin: 0;
    left: 10px;
    bottom: 10px;
    z-index: 10;
    font-weight: bold;
    opacity: 1;
`;

const Card = styled.a`
    display: block;
    max-width: 314px;
    margin: auto;
    width: 100%;
    height: 197px;
    display: block;
    border: 2px solid var(--primary);
    border-radius: 10px;
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
        opacity: 0;
        transition: .3s;
    }
    &:hover {
        opacity: 1;
    }
    &:hover:after {
        opacity: 1;
    }
`;

function CadastroVideo() {
  const valoresIniciais = {
    titulo: '',
    url: '',
    categoria: '',
  };

  const [categorias, setCategorias] = useState([]);
  const [videosCadastrados, setVideosCadastrados] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  useEffect(() => {
    categoriaRepository
      .getAll()
      .then((categoriasFromDB) => setCategorias(categoriasFromDB));
  }, []);

  const { values, handleChange, clearForm } = useForm(valoresIniciais);

  return (
    <PageDefault pathPagina="/cadastro/categoria" nomeBotao="Nova Categoria">
      <Main>
        <h1>
          Cadastro de Vídeo
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();

          // eslint-disable-next-line arrow-body-style
          const categoriaEscolhida = categorias.find((categoria) => {
            // eslint-disable-next-line
            return categoria.titulo === values.categoria; 
          });

          videoRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          }).then((resposta) => setVideosCadastrados(videosCadastrados.concat(resposta)));

          clearForm();
        }}
        >
          <FormField
            label="Título do Vídeo"
            type="text"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
          />
          <FormField
            label="URL do Vídeo"
            type="text"
            name="url"
            value={values.url}
            onChange={handleChange}
          />
          <FormField
            label="Categoria"
            type="text"
            name="categoria"
            value={values.categoria}
            onChange={handleChange}
            suggestions={categoryTitles}
          />

          <Button>
            Cadastrar
          </Button>
        </form>

        <Section>
          <h2>
            Vídeos cadastrados
          </h2>
          <ul>
            {videosCadastrados.length > 0 && (
              videosCadastrados.map((video) => (
                <Card
                  key={`id_${video.titulo}_${Math.random()}`}
                  href={video.url}
                  style={{ backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(video.url)}/maxresdefault.jpg)` }}
                >
                  <article>
                    <Titulo>{video.titulo}</Titulo>
                  </article>
                </Card>
              ))
            )}
          </ul>
        </Section>
        <DivLink>
          <Link to="/">← Home</Link>
        </DivLink>
      </Main>
    </PageDefault>
  );
}

export default CadastroVideo;
