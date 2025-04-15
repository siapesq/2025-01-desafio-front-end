import bcrypt from 'bcryptjs';
import { users } from '../../db';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (users.some(user => user.email === email)) {
      return new Response(JSON.stringify({ message: "E-mail já registrado" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    return new Response(JSON.stringify({ message: "Usuário registrado com sucesso" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro no servidor" }), { status: 500 });
  }
}
