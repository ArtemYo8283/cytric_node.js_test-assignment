import response from "./response.middleware.js";

export const tryCatch =
    (controller) => async (req, res, next) => {
        try {
            const result = await controller(req, res);
            response(200, { values: result || 'Success' }, res);
        } catch (error) {
            response(500, { error: error }, res);
            return next(error);
        }
    };
    
