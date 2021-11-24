import { connection } from "../data/connection.js";

async function gerarComputador(req, res) {
  const { programas, valor_minimo, valor_maximo, sem_valor } = req.body

  try {
    const data = await connection("computador").insert({

    });

    return res.send(data).status(201);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { gerarComputador };
