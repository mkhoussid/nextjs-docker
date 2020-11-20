// TODO, add next-secure-headers or another solution
import next from 'next';
import bodyParser from 'body-parser';
import express, { Application } from 'express';

const PORT = process.env.PORT || 3000;

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();

const applyMiddleware = (app: Application) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
};

const startServer = async () => {
	await nextApp.prepare();

	const app = express();

	app.get('*', (req, res) => handle(req, res));

	app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
};

startServer();
