import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import { Container } from './styles';
import categoriaRepository from '../../repositories/categorias';
import Loading from '../../components/Loading';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriaRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
      })
      .catch((error) => {
        throw new Error('Não foi possível acessar os dados.', error);
      });
  }, []);

  return (
    <div style={{ background: '#141414' }}>
      <PageDefault pathPagina="/cadastro/video" nomeBotao="Novo vídeo">
        <Container>

          {dadosIniciais !== undefined && (dadosIniciais.map((categoria, indice) => {
            if (indice === 0) {
              return (
                <div key={categoria.id}>
                  <BannerMain
                    videoTitle={dadosIniciais[0].videos[0].titulo}
                    url={dadosIniciais[0].videos[0].url}
                    videoDescription="O maior show da Terra somos nós que estamos aqui e que tivemos a dádiva de vir ao mundo entre milhões de possibilidades."
                  />

                  <Carousel
                    ignoreFirstVideo
                    category={dadosIniciais[0]}
                  />
                </div>

              );
            }

            return (
              <Carousel
                key={categoria.id}
                category={categoria}
              />
            );
          }))}
          {dadosIniciais === undefined && (
            <Loading type="spin" color="#2A7AE4" />
          )}
        </Container>
      </PageDefault>
    </div>
  );
}

export default Home;
