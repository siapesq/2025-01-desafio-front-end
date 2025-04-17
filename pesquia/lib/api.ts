import axios from 'axios';
import { generateInsights } from "@/lib/gemini";
// import { RecentSales } from './utils';

//TODO: usar ambos com o usequery...


//TODO: Formato Esperado da validação para o cep:
// const cepSchema = z.string().regex(/^\d{5}-?\d{3}$/, {
//     message: "CEP inválido. Use o formato 12345678 ou 12345-678."
// });

export const fetchAddressByCep = async (cep: string) => {
    try{
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
    }catch (error) {
    console.error('Erro ao consultar o CEP:', error);
    throw error;
    }
};


//TODO: Formato Esperado da validação para o cnpj:
// Esse regex valida tanto o CNPJ com formatação ("11.222.333/0001-81") quanto sem formatação ("11222333000181")
// const cnpjSchema = z.string().regex(/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/, {
//     message: "CNPJ inválido. Use o formato 11222333000181 ou 11.222.333/0001-81."
// });

export const fetchCompanyDataByCnpj = async (cnpj: string) => {
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao consultar o CNPJ:', error);
      throw error;
    }
};

//TODO: GENERIC FETCH:
export async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { ...init, headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.error || 'Erro na requisição');
  }
  return res.json();
}

//TODO: Procurar um melhor lugar para colocar
// export async function fetchInsights() {
//   try {
//     const sales = await RecentSales(); 
//     //TODO: ADICIONAR NO FUTURO as informações de insights de produtos e talz
//     if (!sales || sales.length === 0) {
//       return "Nenhuma venda encontrada para gerar insights.";
//     }

//     const insights = await generateInsights(sales);
//     return insights;
//   } catch (error) {
//     console.error("Erro ao buscar insights:", error);
//     return "Erro ao gerar insights. Tente novamente mais tarde.";
//   }
// }