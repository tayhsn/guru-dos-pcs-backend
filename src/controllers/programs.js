import { connection } from "../data/connection.js";

async function getAllCategorias(req, res) {
      try {
        const data = await connection.select("id", "categoria").from("categorias");
        return res.send(data).status(200);
      } catch (error) {
         return res.status(400).json(error.message);
      }
    }

async function getProgramasByCategoriaId(req, res) {
   const id = req.params.id

   try {
     const data = await connection.select(``)


     res.send(data).status(200)
   } catch (error) {
      return res.status(400).json(error.message);
   }
}

export { getAllCategorias, getProgramasByCategoriaId }