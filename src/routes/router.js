import { Router } from "express";
import { gerarComputador } from "../controllers/algorithm.js";
import { getAllCategorias, getProgramasByCategoriaId, postFeedback } from "../controllers/programs.js";

const router = Router();

router.get("/categorias", getAllCategorias);
router.get("/programa/:id", getProgramasByCategoriaId);

router.post("/gerar-computador", gerarComputador);

router.post("/feedback", postFeedback)

export default router;
