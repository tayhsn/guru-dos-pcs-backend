import { Router } from "express";
import { connection } from '../data/connection.js'

const router = Router();

<<<<<<< HEAD
router.get("/categorias", controller.getAllCategorias);
router.get("/programa/:id", controller.getProgramasByCategoriaId);

router.post("/gerar-computador", controller.gerarComputador);
=======
router.get("/categorias", async (req, res) => {
   try {
      const data = await connection.select('id', 'categoria').from('categorias')
      return data;
    } catch (err) {
      return res.status(400).json(err.message)
    }
});

router.get("/programa/:id")

router.post("/gerar-computador")

>>>>>>> 3e005ff2bd1c9f4f51bc76dfa0c28f2e85bfd830

export default router;
