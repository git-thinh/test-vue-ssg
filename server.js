import fs from 'fs'
import express from 'express';

import {
	renderToString
} from 'vue/server-renderer';
import {
	createApp
} from './app.js';

const server = express();

server.get('/', (req, res) => {
	const app = createApp();
	const temp = fs.readFileSync('./index.html', 'utf-8');
	renderToString(app).then((html) => {
		const s = temp.split('<!--[HTML_BODY]-->').join(html);		
		res.send(s);
	});
});

server.use(express.static('.'));

server.listen(12345, () => {
	console.log('ready:12345');
});
