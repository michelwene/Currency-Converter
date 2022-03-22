import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../services/api";

const valueSchema = yup.object({
  valor: yup.number().required("Campo obrigatório"),
  select: yup.string().required("Campo obrigatório"),
});

type Coins = "EURBRL" | "EURUSD" | "USDBRL" | "USDEUR" | "BRLEUR" | "BRLUSD";

type ICoins = {
  [key in Coins]: {
    bid: string;
  };
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valueSchema),
  });

  const [currency, SetCurrency] = useState<ICoins>();
  const arrayCurrency = ["euro", "reais", "dolar"];
  const arrayConverter = arrayCurrency.filter(
    (item) => item != watch("select")
  );
  const data = new Date();

  async function onSubmit() {
    try {
      const { data } = await api.get(
        "EUR-BRL,EUR-USD,USD-BRL,USD-EUR,BRL-EUR,BRL-USD"
      );
      SetCurrency(data);
    } catch (err) {
      console.log(err);
      alert("Erro");
    }
  }

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
    }
  }

  return (
    <>
      <Head>
        <title>Currency Converter</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.currency}>
          <p>Informe o valor e a moeda para conversão</p>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Valor</label>
              <input type="number" {...register("valor")} />
              {errors.valor && <p>Campo obrigatório</p>}
            </div>
            <div>
              <label>Moeda</label>
              <select {...register("select")}>
                {arrayCurrency.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.select && <p>{errors.select.message}</p>}
            </div>
            <button type="submit">Converter</button>
          </form>
        </section>
        {!!currency && (
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
        )}
      </main>
    </>
  );
}
