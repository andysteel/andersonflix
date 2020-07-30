import React from 'react';
import styled from 'styled-components';
import PageDefault, { Main } from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function getYouTubeId(youtubeURL) {
  return youtubeURL.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, '$7');
}

const url = 'https://www.youtube.com/watch?v=hl1U0bxTHbY';
const titulo = 'Rick and Morty';

const Section = styled.section`
    margin-bottom: 100px;
    & ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 16px;
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
  return (
    <PageDefault pathPagina="/cadastro/categoria" nomeBotao="Nova Categoria">
      <Main>
        <form>
          <br />
          <br />
          <FormField
            label="Título do Vídeo"
            type="text"
            name="titulo"
          />
          <FormField
            label="URL do Vídeo"
            type="text"
            name="url"
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
            <Card
              href={url}
              style={{ backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg)` }}
            >
              <article>
                <Titulo>{titulo}</Titulo>
              </article>
            </Card>

          </ul>
        </Section>
      </Main>
    </PageDefault>
  );
}

export default CadastroVideo;
