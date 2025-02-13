import Sequelize from "sequelize";
import fs from 'fs';

// Read the database configuration from a JSON file.
const config = JSON.parse(fs.readFileSync('src/database/db-config.json', 'utf8'));

// Create a new Sequelize instance with the provided configuration.
const sequelize = new Sequelize(
   config.database,
   config.user,
   config.password,
   {
   host: config.host,
   port: config.port,
   dialect: 'mysql'
   }
);

// Authenticate the connection to the database.
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// Export the Sequelize instance for use in other parts of the application.
export default sequelize;