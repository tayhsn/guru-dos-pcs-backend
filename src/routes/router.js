import { Router } from "express";
import controller from "../controllers/controller.js";

const router = Router();

router.get("/categorias", controller.getAllCategorias);

export default router;
