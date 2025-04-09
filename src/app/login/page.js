'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { login } from '../../services/authService'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ 
    ...form, [e.target.name]: e.target.value 
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await login(form.email, form.password);
      localStorage.setItem('token', data.token); 
      router.push('/dashboard');
    } catch (error) {
      setMsg(error.message); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-500 py-6 px-6">
          <h1 className="text-white text-2xl font-bold text-center">Acesso ao BioDiversa</h1>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                placeholder="seu@email.com"
                type="email"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Entrar
            </button>
          </form>

          {msg && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{msg}</div>}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-green-600 hover:text-green-500 font-medium">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
