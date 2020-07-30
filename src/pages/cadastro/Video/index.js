import React from 'react'
import PageDefault, { Main } from '../../../components/PageDefault';
import './Video.css'
import { Link } from 'react-router-dom';

function getYouTubeId(youtubeURL) {
    return youtubeURL.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, '$7');
  }

const url = 'https://www.youtube.com/watch?v=hl1U0bxTHbY'
const titulo = 'Rick and Morty'

function CadastroVideo() {
    return (
        <PageDefault>
            <Main>
                <form>
                    <label>
                        <input type="" />
                        <span>Título do Vídeo</span>
                    </label>

                    <label>
                        <input type="" />
                        <span>URL do Vídeo</span>
                    </label>

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>


            <section className="listaDeVideos">
                <h2>
                    Vídeos cadastrados
                </h2>
                <ul>
                    <a
                        className="card"
                        href={url}
                        style={{ backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg)` }}>
                        <article>
                        <h3 className="titulo">{titulo}</h3>
                        </article>
                    </a>
 
                </ul>
            </section>
                
                {/* <Link to="/cadastro/categoria">
                    Cadastrar categoria
                </Link> */}
            </Main>
        </PageDefault>
    );
}

export default CadastroVideo