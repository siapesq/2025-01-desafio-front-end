import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../../db';

const SECRET_KEY = "seu_segredo_super_secreto";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ message: "Credenciais inválidas" }), { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro no servidor" }), { status: 500 });
  }
}
