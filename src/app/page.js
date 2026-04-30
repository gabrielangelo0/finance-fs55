'use client'

import { useState } from "react";
import Link from "next/link";
import { CurrencyDollarIcon, EnvelopeSimpleIcon, EyeIcon, EyeSlashIcon, LockKeyIcon } from "@phosphor-icons/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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

        </div>
      </header>

      <main className="w-full h-full flex justify-center items-center">
        <form className="w-96 bg-white -mt-40 drop-shadow-2xl rounded p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-text-title">Acesse sua conta</h1>
            <p className="text-text-body">Gerencie suas finanças com o Digital Money.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-input-bg outline-input-border outline rounded p-4">
              <EnvelopeSimpleIcon size={24} color="#969CB3" />
              <input className="w-full outline-0" type="email" placeholder="E-mail" />
            </div>

            <div>
              <div className="flex items-center gap-3 bg-input-bg outline-input-border outline rounded p-4">
                <LockKeyIcon color="#969CB3" size={24} />
                <input
                  className="w-full outline-0"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-text-body cursor-pointer"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeSlashIcon size={24} /> : <EyeIcon size={24} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link href="/forgot-password" className="text-text-body text-sm hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green hover:bg-green-light transition-colors text-white font-semibold rounded py-4 cursor-pointer"
          >
            Entrar
          </button>

          <p className="text-center text-text-body text-sm">
            Ainda não tem conta?{" "}
            <Link href="/signup" className="text-purple font-bold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
