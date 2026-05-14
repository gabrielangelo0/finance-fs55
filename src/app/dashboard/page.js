"use client";

import instance from "@/lib/api";
import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
  CurrencyDollarIcon,
  XIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import React from "react";
import { Button, message, Space } from "antd";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const [typeOfTransaction, setTypeOfTransaction] = useState("entrada");

  const [transactions, setTransactions] = useState([]);

  const [allEntry, setAllEntry] = useState(0);
  const [allExit, setAllExit] = useState(0);
  const [total, setTotal] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Transação cadastrada com sucesso!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Por favor, preencha todos os campos para cadastrar a transação",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  const sumTotal = allEntry - allExit;

  function handleChangeTypeOfTransaction() {
    setTypeOfTransaction("saida");
  }

  function handleChangeTypeOfTransactionToEntry() {
    setTypeOfTransaction("entrada");
  }

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
    setLoading(true);
    const resposta = await instance({
      url: "transactions",
      method: "GET",
    });

    setTransactions(resposta.data);
    setLoading(false);
  }

  useEffect(() => {
    function sumAllEntry() {
      let somaAcumulada = 0;
      const sum = transactions.map((tran) => {
        if (tran.type === "entrada") {
          somaAcumulada = somaAcumulada + Number(tran.amount);
        }
      });

      setAllEntry(somaAcumulada);

      return sum;
    }

    function sumAllExit() {
      let saidaAcumulada = 0;

      const sum = transactions.map((tran) => {
        if (tran.type === "saida" || tran.type === "") {
          saidaAcumulada = saidaAcumulada + Number(tran.amount);
        }
      });

      setAllExit(saidaAcumulada);
      return sum;
    }

    sumAllEntry();
    sumAllExit();

    getTransactions();
  }, [transactions.length]);

  // getTransactions();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || !amount || !category) {
      error();
      return;
    }

    await instance({
      url: "transactions",
      method: "post",
      data: {
        title: title,
        amount: amount,
        category: category,
        date: "15/04/2026",
        type: typeOfTransaction,
      },
    });

    success();

    getTransactions();
    setOpen(false);
  }

  return (
    <div className="min-h-screen bg-background">
      {contextHolder}
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
            id="new-transaction"
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
              {Number(allEntry).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          {/* Saídas */}
          <div className="bg-shape p-6 rounded shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <header className="flex items-center justify-between">
              <p className="text-text-title text-base">Saídas</p>
              <ArrowCircleDownIcon size={32} className="text-red" />
            </header>
            <strong className="block mt-4 text-3xl font-medium text-text-title">
              {Number(allExit).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          {/* Total */}
          <div className="bg-green p-6 rounded text-white shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <header className="flex items-center justify-between">
              <p className="text-base">Total</p>
              <CurrencyDollarIcon size={32} />
            </header>
            <strong className="block mt-4 text-3xl font-medium">
              {Number(sumTotal).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>
        </div>

        {/* Transactions Table */}

        {loading == true ? (
          <CircleNotchIcon className="animate-spin" weight="bold" size={32} />
        ) : (
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
                  <tr key={transaction.id} className="bg-white p-3">
                    <td className="py-7 px-8">{transaction.title}</td>
                    <td
                      className={
                        "px-8 text-3xl " +
                        (transaction.type === "entrada"
                          ? "text-emerald-600"
                          : "text-red-600")
                      }
                    >
                      {Number(transaction.amount).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-8">{transaction.category}</td>
                    <td className="px-8">{transaction.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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
              id="title"
              placeholder="Titulo"
              onChange={handleChangeTitle}
              className="w-full py-4 px-6 rounded border border-input-border bg-input-bg text-base mb-4 outline-none placeholder:text-text-body"
            />

            <input
              type="number"
              id="amount"
              placeholder="Valor"
              onChange={handleChangeAmount}
              className="w-full py-4 px-6 rounded border border-input-border bg-input-bg text-base mb-4 outline-none placeholder:text-text-body"
            />

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={handleChangeTypeOfTransactionToEntry}
                className={
                  "flex items-center justify-center gap-2 py-4 rounded border border-input-border text-base cursor-pointer text-text-title transition-colors " +
                  (typeOfTransaction === "entrada"
                    ? "bg-green-highlight"
                    : "bg-input-bg")
                }
              >
                <ArrowCircleUpIcon size={20} className="text-green" />
                Entrada
              </button>

              <button
                type="button"
                onClick={handleChangeTypeOfTransaction}
                className={
                  "flex items-center justify-center gap-2 py-4 rounded border border-input-border text-base cursor-pointer text-text-title transition-colors " +
                  (typeOfTransaction === "saida"
                    ? "bg-red-highlight"
                    : "bg-input-bg")
                }
              >
                <ArrowCircleDownIcon size={20} className="text-red" />
                Saída
              </button>
            </div>

            <input
              type="text"
              placeholder="Categoria"
              id="category"
              onChange={handleChangeCategory}
              className="w-full py-4 px-6 rounded border border-input-border bg-input-bg text-base mb-6 outline-none placeholder:text-text-body"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              id="btn-register"
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
