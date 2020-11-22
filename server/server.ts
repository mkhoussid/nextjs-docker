import next from 'next';
import express from 'express';

const PORT = process.env.PORT || 3000;

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();

const startServer = async () => {
	await nextApp.prepare();

	const app = express();

	app.get('*', (req, res) => handle(req, res));

	app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
};

startServer();
