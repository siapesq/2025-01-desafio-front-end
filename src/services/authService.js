const API_URL = 'api/';

export async function register(userData) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    return data;
}

export async function login(email, senha) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, senha}),
    });

    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    return data;
}

export function logout() {
    localStorage.removeItem('token');
}
  
export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

