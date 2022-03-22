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

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valueSchema),
  });

  const [currency, SetCurrency] = useState<any>();
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

  function selectCoin(currency: any) {
    if (watch("select") == "euro") {
      const euroDolar = parseFloat(currency.EURUSD.bid).toFixed(3);
      const euroReal = currency.EURBRL.bid;
      return [euroReal, euroDolar];
    }
    if (watch("select") == "dolar") {
      const dolarEuro = parseFloat(currency.USDEUR.bid).toFixed(3);
      const dolarReal = parseFloat(currency.USDBRL.bid).toFixed(3);
      return [dolarEuro, dolarReal];
    }
    if (watch("select") == "reais") {
      const realDolar = currency.BRLUSD.bid;
      const realEuro = currency.BRLEUR.bid;
      return [realEuro, realDolar];
    }
  }

  return (
    <>
      <Head>
        <title>Currency Converter</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.currency}>
          <p>informe o valor e a moeda para conversão</p>
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
              <br />

              <label>{arrayConverter[0]}</label>
              <p>{watch("valor") * selectCoin(currency)[0]}</p>
              <br />

              <label>{arrayConverter[1]}</label>
              <p>{watch("valor") * selectCoin(currency)[1]}</p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
