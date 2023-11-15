import ApiService from "../services/api.service.js";

export class ApiController {
    constructor () {
        // Create an instance of the ApiService class.
        this.service = new ApiService();
    }

    async getStatus(req, res) {
        const result = await this.service.getStatus();
        return result;
    }

    async processImage(req, res) {
        const { imageUrl } = req.body;
        const result = await this.service.processImage(imageUrl);
        return result;
    }
}
// Create an instance of the ApiController class.
const apiController = new ApiController();
// Export the ApiController instance for use in other parts of the application.
export default apiController;
