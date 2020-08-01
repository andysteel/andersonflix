import { useState } from 'react';

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {

    if (chave.includes('.')) {
      const nested = chave.split('.');
      const chave2 = nested[0];
      const chave3 = nested[1];

      setValues({
        ...values,
        [chave2]: { [chave3]: valor },
      });
    } else {
      setValues({
        ...values,
        [chave]: valor,
      });
    }
  }

  function handleChange(evento) {
    setValue(
      evento.target.getAttribute('name'),
      evento.target.value,
    );
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  return {
    values,
    handleChange,
    clearForm,
  };
}

export default useForm;
