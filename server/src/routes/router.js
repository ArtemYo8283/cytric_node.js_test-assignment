import apiRouter from './api/api.router.js';
class AppRouter {
	constructor(app) { this.app = app }
	init() {
		this.app.get('/', (_req, res) => {
			res.send('API Running');
		});
		this.app.use('/api/', apiRouter);
	}
}

export default AppRouter;