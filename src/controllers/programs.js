import { connection } from "../data/connection.js";

async function getAllCategorias(_, res) {
  try {
    const data = await connection.select("id", "categoria").from("categorias");
    return res.send(data).status(200);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function getProgramasByCategoriaId(req, res) {
  const id = req.params.id;

  try {
    const data = await connection
      .table("programas")
      .innerJoin("categorias", "categorias.id", "=", "programas.id_categoria")
      .innerJoin(
        "nivel_consumo",
        "nivel_consumo.id",
        "=",
        "programas.id_nivel_consumo"
      )
      .select(
        "programas.id",
        "programas.nome",
        "programas.rank",
        "categorias.id",
        "categorias.categoria",
        "nivel_consumo.id",
        "nivel_consumo.nivel"
      )
      .where('programas.id_categoria', id);

    res.send(data).status(200);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { getAllCategorias, getProgramasByCategoriaId };
