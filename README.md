# Currency Converter.

Esta é uma solução para o criar um conversor de moedas, suporte conversões em Euro, Dólar e Reais.

## :dart: Resumo de conteúdos

- [Visão Geral](#Visão-Geral)
  - [O desafio](#O-desafio)
  - [Captura de tela](#Captura-de-tela)
  - [Links](#Links)
- [Meu processo](#Meu-processo)
  - [Construído com](#Constrído-com)
  - [O que eu aprendi](#O-que-eu-aprendi)
  - [Continuação dos desenvolvimentos](#Continuação-dos-desenvolvimentos)
  - [Recursos utilizados](#Recursos-utilizados)
- [Autor](#Autor)

## Visão Geral.

### :globe_with_meridians: O desafio

Os usuários devem ser capazes de:

- Visualizar o layout ideal para o aplicativo, dependendo do tamanho da tela do dispositivo.
- Visualizar os estados de foco para todos os elementos interativos na página.
- Conseguir adicionar valores para conversão.
- Conseguir selecionar as moedas para conversão.
- Conseguir visualizar o valor das moedas convertidas.

### Captura de tela

- Desktop
<p  align="center" >
  <img src="src/assets/Desktop.png"alt="Desktop"/>
</p>

- Tablet
<p  align="center" >
<img src="src/assets/Mobile.png"alt="Tablet"/>
</p>

- Mobile
<p  align="center" >
<img src="src/assets/Mobile.png"alt="mobile"/>
</p>

- Gif
<p  align="center" >
<img src="src/assets/Currency_Converter.gif">
</p>

### Links

- Solução URL: [https://github.com/michelwene/Currency-Converter](https://github.com/michelwene/Currency-Converter)
- Site URL: [https://currency-converter-ajyhuax3h-michelwene.vercel.app/](https://currency-converter-ajyhuax3h-michelwene.vercel.app/)

## :page_with_curl: Meu processo

### Construído com

- NextJS
- Typescript
- Axios
- React-hook-form
- Styled-Components
- Design responsivo

### :bulb: O que eu aprendi

```typescript
type Coins = "EURBRL" | "EURUSD" | "USDBRL" | "USDEUR" | "BRLEUR" | "BRLUSD";

type ICoins = {
  [key in Coins]: {
    bid: string;
  };
}; // tipagem do useState pertencente aos currencys e tipagem dos currecyns na função selectCoin.

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm({
  resolver: yupResolver(valueSchema),
}); // utilizando do react-hook-form para utilizar no formulário de preenchimento do valor pegando o valor do campo e registrar as options do select que dentro dele estarão as moedas utilizadas para conversão.

{
  !!currency && (
    <section className={styles.converter}>
      <p>Resultado da Conversão - Cotação do dia</p>
      <hr />
      <div>
        <label>Data da Consulta</label>
        <p>{`${data.getDate()}/${data.getMonth()}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`}</p>

        <label>{arrayConverter[0]}</label>
        <p>{watch("valor") * Number(selectCoin(currency)[0])}</p>

        <label>{arrayConverter[1]}</label>
        <p>{watch("valor") * Number(selectCoin(currency)[1])}</p>
      </div>
    </section>
  );
} // esta é a seção onde eu calculo o valor do resultado da conversão, de acordo com a moeda selecionada no select.

function selectCoin(currency: ICoins) {
  switch (watch("select")) {
    case "euro":
      const euroDolar = Number(currency.EURUSD.bid).toFixed(3);
      const euroReal = Number(currency.EURBRL.bid).toFixed(3);
      return [euroReal, euroDolar];

    case "dolar":
      const dolarEuro = Number(currency.USDEUR.bid).toFixed(3);
      const dolarReal = Number(currency.USDBRL.bid).toFixed(3);
      return [dolarEuro, dolarReal];

    case "reais":
      const realDolar = Number(currency.BRLUSD.bid).toFixed(3);
      const realEuro = Number(currency.BRLEUR.bid).toFixed(3);
      return [realEuro, realDolar];

    default:
      return ["", ""];
  } //esta função faz com que eu consiga converter as moedas de acordo com o que foi selecionado, fazendo com que eu não repita a moeda da conversão, por exemplo, converter euro em euro, ou real em real.
}
```

### Continuação dos desenvolvimentos

Pretendo continuar fazendo projetos do FrontendMentor, para melhorar meus conhecimentos em NextJS e TypeScript.

### Recursos utilizados

- [Developer Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - A documentação do Developer Mozilla é essencial para compreender as funções e conseguir aplicar as mesmas no projeto.

- [Typescript](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- Documentação do Typescript utilizada para realizar a tipagem utilizando o key in.

- [React-hook-form](https://react-hook-form.com/)
- Utilizado para fazer o formulário de inserção de valor e do select.

- [Yup](https://github.com/jquense/yup)
- Utilização do yup para formatação do formulário.

- [Awesome api](https://economia.awesomeapi.com.br/last/EUR-BRL,EUR-USD,USD-BRL,USD-EUR,BRL-EUR,BRL-USD) - Esta é uma API que eu consumi para pegar as frases de conselho.

## :medal_military: Autor

- Linkedin - [@michelwene](https://www.linkedin.com/in/michelwene/)
