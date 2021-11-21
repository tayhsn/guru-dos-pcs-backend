import { connection } from "../data/connection.js";

async function gerarComputador(req, res) {
  
  const {programas, valor_maximo, valor_minimo, sem_limite} = req.body;
  try {
    //aqui eu vou fazer o algoritimo

    //aqui finaliza o algoritimo
    const data = await connection("computador").insert({

    });

    return res.send(data).status(201);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { gerarComputador };
