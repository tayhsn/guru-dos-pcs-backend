import { Router } from "express";
import { gerarComputador } from "../controllers/algorithm.js";
import { getAllCategorias, getProgramasByCategoriaId } from "../controllers/programs.js";

const router = Router();

router.get("/categorias", getAllCategorias);
router.get("/programa/:id", getProgramasByCategoriaId);

router.post("/gerar-computador", gerarComputador);

export default router;
