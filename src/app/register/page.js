'use client';

import { useState } from 'react';
import Link from "next/link"

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setMsg('Todos os campos são obrigatórios.');
      setMsgType('error');
      return;
    }

    if (form.name.trim().split(' ').length < 2) {
      setMsg('Por favor, insira seu nome completo.');
      setMsgType('error');
      return;
    }

    if (!emailRegex.test(form.email)) {
      setMsg('Por favor, insira um e-mail válido.');
      setMsgType('error');
      return;
    }

    if (form.password.length < 8) {
      setMsg('A senha deve ter pelo menos 8 caracteres.');
      setMsgType('error');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMsg('As senhas não coincidem.');
      setMsgType('error');
      return;
    }

    if (!form.termsAccepted) {
      setMsg('Você precisa aceitar os termos de serviço e a política de privacidade.');
      setMsgType('error');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);
    setMsgType(res.ok ? 'success' : 'error');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-500 py-6 px-6">
          <h1 className="text-white text-2xl font-bold text-center">Junte-se ao BioDiversa</h1>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
              <input 
                id="name"
                name="name" 
                placeholder="Seu nome completo" 
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
              <input 
                id="password"
                name="password" 
                placeholder="Crie uma senha forte" 
                type="password" 
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
              <p className="text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar senha</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>
            
            <div className="flex items-center">
              <input 
                id="terms" 
                name="termsAccepted" 
                type="checkbox"
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Eu concordo com os{' '}
                <Link href="/terms" className="text-green-600 hover:text-green-500 font-medium">
                  Termos de Serviço
                </Link>
                {' '}e{' '}
                <Link href="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                  Política de Privacidade
                </Link>
              </label>
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Criar Conta
            </button>
          </form>
          
          {msg && (
            <div className={`mt-4 p-3 ${
              msgType === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
              } rounded-md`}
            >
              {msg}
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-green-600 hover:text-green-500 font-medium">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-green-600 hover:text-green-500 font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
