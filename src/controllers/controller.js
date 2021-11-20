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

async function gerarComputador(req, res) {
   const computador = {
     id: req.body.id,
     nome: req.body.nome,
     rank: req.body.rank,
     categorias: {
       id: req.body.cat.id,
       categoria: req.body.cat.nome
     },
     nvl_consumo: {
       id: req.body.nvl.id,
       nivel: req.body.nvl.nivel
     },
     valor_minimo: req.body.valor_minimo,
     valor_maximo: req.body.valor_maximo,
     sem_valor: req.body.sem_valor
   }

   try {
     

      return res.send().status(201)
   } catch (error) {
      return res.status(400).json(error.message);
   }
}

export default { getAllCategorias, getProgramasByCategoriaId, gerarComputador }