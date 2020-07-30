import React, { useState } from 'react'
import PageDefault, { Main } from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';

function CadastroCategoria() {

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '#000000'
    }

    const [categorias, setCategorias] = useState([])
    const [values, setValues] = useState(valoresIniciais)

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor,
        })
    }

    function handleChange(evento) {
        setValue(
            evento.target.getAttribute('name'),
            evento.target.value
        )
    }

    return (
        <PageDefault>
            <Main>
                <h1>Cadastro de Categoria: {values.nome}</h1>
                
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setCategorias([
                        ...categorias,
                        values
                    ])
                    setValues(valoresIniciais)
                    }}>
                    <FormField label="Nome da categoria:"
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}></FormField>
                    <div>
                        <label>
                            Descrição:
                            <textarea type="text" name="descricao" value={values.descricao} 
                                onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Cor:
                            <input type="color" name="cor" value={values.cor} 
                                onChange={handleChange} />
                        </label>
                    </div>

                    <button>
                        Cadastrar
                    </button>
                </form>

                <ul>
                    {categorias.map((categoria, indice) => {
                        return (
                            <li key={`${categoria}${indice}`}>
                                {categoria.nome}
                            </li>
                        )
                    })}
                </ul>

                <Link to="/">
                    Ir Para Home
                </Link>
            </Main>
        </PageDefault>
    );
}

export default CadastroCategoria