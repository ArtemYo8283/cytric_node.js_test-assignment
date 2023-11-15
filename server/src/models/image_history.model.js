// Import the DataTypes module from Sequelize.
import { DataTypes } from 'sequelize';
// Import the Sequelize instance
import sequelize from '../database/db.connection.js';

// Define a "Image_history" model using Sequelize. This represents a table in the database.
const Image_history = sequelize.define('imagehistories', {
  	// Define a columns
    urlOrigin: DataTypes.STRING,
	urlNew: DataTypes.STRING,
	createdAt : DataTypes.DATE
});

// Export the "Image_history" model for use in other parts of the application.
export default Image_history;