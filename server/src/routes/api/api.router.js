import { Router } from "express";
import { tryCatch } from "../../middleware/tryCacth.middleware.js";
import apiController from "../../controllers/api.controller.js";

const apiRouter = Router();

apiRouter.get(
    '/status', 
    tryCatch(apiController.getStatus.bind(apiController))
);

export default apiRouter;