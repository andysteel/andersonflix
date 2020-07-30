import React from 'react';
import dadosIniciais from '../../data/dados_iniciais.json';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import { Container } from './styles'

function Home() {
  return (
    <div style={{ background: "#141414" }}>
      <PageDefault>
        <Container>
        <BannerMain
          videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
          url={dadosIniciais.categorias[0].videos[0].url}
          videoDescription={"O maior show da Terra somos nós que estamos aqui e que tivemos a dádiva de vir ao mundo entre milhões de possibilidades."}
        />

        <Carousel
          ignoreFirstVideo
          category={dadosIniciais.categorias[0]}
        />

        <Carousel
          category={dadosIniciais.categorias[1]}
        />

        <Carousel
          category={dadosIniciais.categorias[2]}
        />      

        <Carousel
          category={dadosIniciais.categorias[3]}
        />      

        <Carousel
          category={dadosIniciais.categorias[4]}
        />      

        <Carousel
          category={dadosIniciais.categorias[5]}
        />      
      </Container>
      </PageDefault>
    </div>
  );
}

export default Home;
