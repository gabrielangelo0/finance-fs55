"use client";

import instance from "@/lib/api";
import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
  CurrencyDollarIcon,
  XIcon,
} from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const [transactions, setTransactions] = useState([]);

  console.log("title: ", title);
  console.log("amount: ", amount);
  console.log("category: ", category);

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function handleChangeTitle(event) {
    setTitle(event.target.value);
  }

  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }

  function handleChangeCategory(event) {
    setCategory(event.target.value);
  }

  async function getTransactions() {
    const resposta = await instance({
      url: "transactions",
      method: "GET",
    });

    setTransactions(resposta.data);
    console.log("resposta: ", resposta.data);
  }

  useEffect(() => {
    getTransactions();
  }, [open, amount]);

  // getTransactions();

  function handleSubmit() {
    axios.post("http://localhost:3001/transactions", {
      title: title,
      amount: amount,
      category: category,
      date: "15/04/2026",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-purple">
        <div className="max-w-280 mx-auto pt-8 px-4 pb-48 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-light flex items-center justify-center text-white font-bold text-xl">
              <CurrencyDollarIcon size={24} />
            </div>
            <span className="text-white text-2xl font-semibold">
              Digital Money
            </span>
          </div>

          <button
            onClick={handleOpenModal}
            className="bg-purple-light text-white border-none py-3 px-8 rounded cursor-pointer font-medium text-base hover:brightness-90 transition-all"
          >
            Nova transação
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <main className="max-w-280 mx-auto px-4 -mt-16">
        <div className="grid grid-cols-3 gap-8 mb-16">
          {/* Entradas */}
          <div className="bg-shape p-6 rounded shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <header className="flex items-center justify-between">
              <p className="text-text-title text-base">Entradas</p>
              <ArrowCircleUpIcon size={32} className="text-green" />
            </header>
            <strong className="block mt-4 text-3xl font-medium text-text-title">
              R$ 0,00
            </strong>
          </div>

          {/* Saídas */}
          <div className="bg-shape p-6 rounded shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <header className="flex items-center justify-between">
              <p className="text-text-title text-base">Saídas</p>
              <ArrowCircleDownIcon size={32} className="text-red" />
            </header>
            <strong className="block mt-4 text-3xl font-medium text-text-title">
              R$ 0,00
            </strong>
          </div>

          {/* Total */}
          <div className="bg-green p-6 rounded text-white shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <header className="flex items-center justify-between">
              <p className="text-base">Total</p>
              <CurrencyDollarIcon size={32} />
            </header>
            <strong className="block mt-4 text-3xl font-medium">R$ 0,00</strong>
          </div>
        </div>

        {/* Transactions Table */}
        <table
          className="w-full"
          style={{ borderSpacing: "0 0.5rem", borderCollapse: "separate" }}
        >
          <thead>
            <tr>
              <th className="text-text-body font-normal py-4 px-8 text-left leading-6">
                Titulo
              </th>
              <th className="text-text-body font-normal py-4 px-8 text-left leading-6">
                Valor
              </th>
              <th className="text-text-body font-normal py-4 px-8 text-left leading-6">
                Categoria
              </th>
              <th className="text-text-body font-normal py-4 px-8 text-left leading-6">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {/* As linhas da tabela serão renderizadas aqui */}
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td>
                    {Number(transaction.amount).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      {/* Modal */}
      <div
        onClick={handleCloseModal}
        className={
          "fixed inset-0 bg-overlay items-center justify-center z-50 " +
          (open == true ? "flex" : "hidden")
        }
      >
        <div
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          className="bg-background p-12 rounded w-full max-w-lg relative"
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-6 right-6 bg-transparent border-none text-2xl cursor-pointer text-text-body hover:text-text-title transition-colors"
          >
            <XIcon size={24} />
          </button>

          <h2 className="text-text-title text-2xl mb-8 font-semibold">
            Cadastrar transação
          </h2>

          <form>
            <input
              type="text"
              placeholder="Titulo"
              onChange={handleChangeTitle}
              className="w-full py-4 px-6 rounded border border-input-border bg-input-bg text-base mb-4 outline-none placeholder:text-text-body"
            />

            <input
              type="number"
              placeholder="Valor"
              onChange={handleChangeAmount}
              className="w-full py-4 px-6 rounded border border-input-border bg-input-bg text-base mb-4 outline-none placeholder:text-text-body"
            />

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-4 rounded border border-input-border text-base cursor-pointer text-text-title transition-colors bg-input-bg"
              >
                <ArrowCircleUpIcon size={20} className="text-green" />
                Entrada
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-4 rounded border border-input-border text-base cursor-pointer text-text-title transition-colors bg-input-bg"
              >
                <ArrowCircleDownIcon size={20} className="text-red" />
                Saída
              </button>
            </div>

            <input
              type="text"
              placeholder="Categoria"
              onChange={handleChangeCategory}
              className="w-full py-4 px-6 rounded border border-input-border bg-input-bg text-base mb-6 outline-none placeholder:text-text-body"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-5 bg-green text-white border-none rounded text-base font-semibold cursor-pointer hover:brightness-90 transition-all"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
