// Import the CommentService module.
import ApiService from "../services/api.service.js";
// Import validator functions.

export class ApiController {
    constructor () {
        // Create an instance of the CommentService class.
        this.service = new ApiService();
    }
    // Method to retrieve all comments and emit the result to the client.
    async getStatus(req, res) {
        const result = await this.service.getStatus();
        console.log(result);
        return result;
    }
}
// Create an instance of the CommentController class.
const apiController = new ApiController();
// Export the CommentController instance for use in other parts of the application.
export default apiController;
