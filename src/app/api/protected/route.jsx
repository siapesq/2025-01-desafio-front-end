import jwt from 'jsonwebtoken';

const SECRET_KEY = "seu_segredo_super_secreto";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "Token não fornecido" }), { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return new Response(JSON.stringify({ message: "Acesso permitido", user: decoded }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Token inválido" }), { status: 403 });
  }
}
