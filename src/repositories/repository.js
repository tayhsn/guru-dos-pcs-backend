import { connection } from "../data/connection.js";

async function getAllCategorias(req, res) {
  try {
    const data = await connection("categorias").first();
    return data;
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

export default { getAllCategorias };
