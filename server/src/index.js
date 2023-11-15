import bodyParser from 'body-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path  from 'path'

import AppRouter from './routes/router.js';
import ErrorHandler from './middleware/errorHandler.middleware.js';

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, //The maximum number of requests for the specified time period
    message: 'Request limit exceeded. Try again later.',
});
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
const app = express();
const router = new AppRouter(app);

// Express configuration
app.use('/api', limiter);
app.set('port', process.env.PORT || 8080);
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: "1000mb" }));
app.use(ErrorHandler);
app.use('/images', express.static(`${path.resolve()}/assets/images`));

router.init();

const port = app.get('port');

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;